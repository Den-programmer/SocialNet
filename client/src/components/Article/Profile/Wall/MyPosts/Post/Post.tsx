import React, { ChangeEvent, useRef, useEffect, useCallback, useState } from 'react'
import { Avatar, Typography, Input, Button, message, Space, Popconfirm, Tooltip } from 'antd'
import { LikeOutlined, MessageOutlined, ShareAltOutlined, HeartFilled, DeleteOutlined, LockOutlined, GlobalOutlined } from '@ant-design/icons'
import classes from './Post.module.scss'
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/hooks'
import { profileActions } from '../../../../../../BLL/reducer-profile'
import {
  useUpdatePostTitleMutation,
  useUpdatePostInformatMutation,
  useUpdatePostVisibilityMutation,
  useDeletePostMutation,
  useTogglePostLikeMutation,
  useAddPostCommentMutation,
  useRepostPostMutation
} from '../../../../../../DAL/profileApi'
import { selectPostEdits } from '../../../../../../BLL/selectors/profile-selectors'
import { enteredNothingError, FieldValidator, maxLengthCreator, minLengthCreator, required, runValidators } from '../../../../../../utils/validators/validators'
import { selectAuthorizedUserId } from '../../../../../../BLL/selectors/auth-selectors'

const { Title, Paragraph } = Typography

interface IPost {
  userName: string
  postTitle: string
  postInf: string
  postImg: string | File
  post_id: string
  createdAt: string
  likesCount: number
  avatar: string | undefined | File
  isModalOpen: boolean
  canDelete?: boolean
  visibility?: 'public' | 'private'
  likedByViewer?: boolean
  canInteract?: boolean
  comments?: Array<{ id: string; author: string; text: string; createdAt: string }>
  repostsCount?: number
}

const defaultUserPhoto = import.meta.env.VITE_CLOUDINARY_DEFAULT_USER
const noPostImg = import.meta.env.VITE_CLOUDINARY_NO_PHOTO_URL

const titleValidators: FieldValidator[] = [
  enteredNothingError,
  required,
  minLengthCreator(3),
  maxLengthCreator(120)
]

const infValidators: FieldValidator[] = [
  enteredNothingError,
  required,
  minLengthCreator(3),
  maxLengthCreator(2000)
]

const Post: React.FC<IPost> = props => {
  const postContentRef = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()
  const { startEdit, updateDraft, finishEdit } = profileActions

  const [updatePostTitle] = useUpdatePostTitleMutation()
  const [updatePostInf] = useUpdatePostInformatMutation()
  const [updatePostVisibility] = useUpdatePostVisibilityMutation()
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation()
  const [toggleLike] = useTogglePostLikeMutation()
  const [addComment] = useAddPostCommentMutation()
  const [repostPost] = useRepostPostMutation()


  const [avatarImage, setAvatarImage] = useState<string>(props.avatar || defaultUserPhoto)
  const [postVisibility, setPostVisibility] = useState<'public' | 'private'>(props.visibility || 'public')
  const [postImage, setPostImage] = useState<string>(noPostImg)
  const [liked, setLiked] = useState<boolean>(Boolean(props.likedByViewer))
  const [likes, setLikes] = useState<number>(props.likesCount || 0)
  const [comments, setComments] = useState(props.comments || [])
  const [commentDraft, setCommentDraft] = useState('')
  const [reposts, setReposts] = useState<number>(props.repostsCount || 0)
  const authorizedUserId = useAppSelector(selectAuthorizedUserId)

  const resolveImage = useCallback((img: string | File | undefined | null, fallback: string): string => {
    if (!img) return fallback
    if (typeof img === 'string') return img
    if (img instanceof File) return URL.createObjectURL(img)
    return fallback
  }, [])

  useEffect(() => {
    setPostVisibility(props.visibility || 'public')
  }, [props.visibility])

  useEffect(() => {
    const result = resolveImage(props.avatar, defaultUserPhoto)
    setAvatarImage(result)

    return () => {
      if (props.avatar instanceof File) URL.revokeObjectURL(result)
    }
  }, [props.avatar, resolveImage])

  useEffect(() => {
    const result = resolveImage(props.postImg, noPostImg)
    setPostImage(result)

    return () => {
      if (props.postImg instanceof File) URL.revokeObjectURL(result)
    }
  }, [props.postImg, resolveImage])

  const postEdit = useAppSelector(state =>
    selectPostEdits(state, props.post_id)
  ) ?? { isEditing: false, draftTitle: '', draftInf: '' }

  const canManageThisPost = props.canDelete
  const canInteractWithPost = props.canInteract ?? Boolean(authorizedUserId)

  const saveChanges = useCallback(async () => {
    if (!postEdit.isEditing) return
    if (!canManageThisPost) return

    const title = postEdit.draftTitle.trim()
    const inf = postEdit.draftInf.trim()
    const titleChanged = title !== props.postTitle
    const infChanged = inf !== props.postInf

    if (!titleChanged && !infChanged) {
      dispatch(finishEdit(props.post_id))
      return
    }

    if (titleChanged) {
      const error = runValidators(title, titleValidators)
      if (error) { message.warning(error); return }
    }

    if (infChanged) {
      const error = runValidators(inf, infValidators)
      if (error) { message.warning(error); return }
    }

    try {
      if (titleChanged) await updatePostTitle({ postId: props.post_id, newTitle: title }).unwrap()
      if (infChanged) await updatePostInf({ postId: props.post_id, newInformat: inf }).unwrap()
      message.success('Post updated')
    } catch (err) {
      console.error(err)
      message.error('Failed to update post')
    } finally {
      dispatch(finishEdit(props.post_id))
    }
  }, [
    postEdit,
    props.post_id,
    props.postTitle,
    props.postInf,
    updatePostTitle,
    updatePostInf,
    dispatch,
    finishEdit
  ])

  const handleOutsideClick = useCallback((e: MouseEvent) => {
    if (postContentRef.current && !postContentRef.current.contains(e.target as Node)) {
      saveChanges()
    }
  }, [saveChanges])

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick)
    return () => document.removeEventListener('click', handleOutsideClick)
  }, [handleOutsideClick])

  const handleStartEdit = (e: React.MouseEvent) => {
    if (!canManageThisPost || !authorizedUserId) return
    e.stopPropagation()
    dispatch(startEdit(props.post_id))
  }

  const handleChange = (field: 'title' | 'inf') => (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateDraft({ postId: props.post_id, field, value: e.target.value }))
  }

  const handleToggleLike = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      const result = await toggleLike({ postId: props.post_id }).unwrap()
      setLiked(Boolean(result.likedByViewer))
      setLikes(result.likesCount || 0)
    } catch (err) {
      console.error(err)
      message.error('Failed to update like')
    }
  }

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = commentDraft.trim()
    if (!trimmed) return

    try {
      const result = await addComment({ postId: props.post_id, comment: trimmed }).unwrap()
      setComments(result.comments || [])
      setCommentDraft('')
    } catch (err) {
      console.error(err)
      message.error('Failed to add comment')
    }
  }

  const handleRepost = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      const result = await repostPost({ postId: props.post_id }).unwrap()
      setReposts(result.repostsCount || 0)
      message.success('Post reposted')
    } catch (err) {
      console.error(err)
      message.error('Failed to repost')
    }
  }

  const handleDelete = async () => {
    if (!canManageThisPost) return

    try {
      await deletePost({ postId: props.post_id, userId: authorizedUserId }).unwrap()
      message.success('Post deleted')
    } catch (err) {
      console.error(err)
      message.error('Failed to delete post')
    }
  }

  const handleVisibilityChange = async (nextVisibility: 'public' | 'private') => {
    if (!canManageThisPost) return
    if (nextVisibility === postVisibility) return

    try {
      const result = await updatePostVisibility({
        postId: props.post_id,
        visibility: nextVisibility
      }).unwrap()

      const nextVisibleState = result?.visibility || nextVisibility
      setPostVisibility(nextVisibleState)
      message.success(`Post set to ${nextVisibleState === 'private' ? 'Private' : 'Public'}`)
    } catch (err) {
      console.error(err)
      message.error('Failed to update visibility')
    }
  }

  return (
    <div className={classes.post}>
      <div className={classes.card}>
        <div className={classes.header}>
          <div className={classes.headerLeft}>
            <Avatar size={48} src={avatarImage} />
            <div className={classes.userInfo}>
              <div className={classes.userName}>{props.userName}</div>
              <div className={classes.postTime}>{props.createdAt}</div>
              <div className={classes.visibilityLabel}>
                {postVisibility === 'private' ? <LockOutlined /> : <GlobalOutlined />}
                <span>{postVisibility === 'private' ? 'Private' : 'Public'}</span>
              </div>
            </div>
          </div>
          <div className={classes.headerRight}>
            {canManageThisPost && (
              <div className={classes.visibilityToggle} onClick={e => e.stopPropagation()}>
                <button
                  type="button"
                  className={`${classes.visibilityToggleBtn} ${postVisibility === 'public' ? classes.visibilityToggleBtnActive : ''}`}
                  onClick={() => handleVisibilityChange('public')}
                >
                  Public
                </button>
                <button
                  type="button"
                  className={`${classes.visibilityToggleBtn} ${postVisibility === 'private' ? classes.visibilityToggleBtnActive : ''}`}
                  onClick={() => handleVisibilityChange('private')}
                >
                  Private
                </button>
              </div>
            )}
            {canManageThisPost && (
              <Popconfirm
                title="Delete post"
                description="This post will be permanently removed."
                okText="Delete"
                okButtonProps={{ danger: true }}
                onConfirm={handleDelete}
              >
                <Tooltip title="Delete post">
                  <Button
                    type="text"
                    danger
                    shape="circle"
                    icon={<DeleteOutlined />}
                    loading={isDeleting}
                    onClick={e => e.stopPropagation()}
                  />
                </Tooltip>
              </Popconfirm>
            )}
          </div>
        </div>

        <div className={classes.body} onClick={canManageThisPost ? handleStartEdit : undefined}>
          <div className={classes.leftImage}>
            <img src={postImage} alt="post visual" />
          </div>

          <div className={classes.rightContent} ref={postContentRef}>
            <div className={classes.titleRow}>
              {postEdit.isEditing ? (
                <Input value={postEdit.draftTitle} onChange={handleChange('title')} placeholder="Post title" />
              ) : (
                <Title level={3} className={classes.postTitle}>{props.postTitle}</Title>
              )}
            </div>

            <div className={classes.horizontal_line} />

            <div className={classes.contentRow}>
              {postEdit.isEditing ? (
                <Input value={postEdit.draftInf} onChange={handleChange('inf')} placeholder="Post content" />
              ) : (
                <Paragraph className={classes.postInf}>{props.postInf}</Paragraph>
              )}
              <div className={classes.hashtag}>#reactjs</div>
            </div>
          </div>
        </div>

        <div className={classes.footer}>
          {canInteractWithPost ? (
            <div className={classes.actions} onClick={e => e.stopPropagation()}>
              <Space>
                <Button type="text" icon={liked ? <HeartFilled style={{ color: '#ff4d4f' }} /> : <LikeOutlined />} onClick={handleToggleLike} />
                <Button type="text" icon={<MessageOutlined />} />
                <Button type="text" icon={<ShareAltOutlined />} onClick={handleRepost} />
              </Space>
            </div>
          ) : <div />}

          <div className={classes.reactions}>
            <div className={classes.reactionBadge}>
              <HeartFilled style={{ color: '#ff4d4f', marginRight: 6 }} />
              <span>{likes}</span>
            </div>
            <div className={classes.reactionBadge}>
              <MessageOutlined style={{ marginRight: 6 }} />
              <span>{comments.length}</span>
            </div>
            <div className={classes.reactionBadge}>
              <ShareAltOutlined style={{ marginRight: 6 }} />
              <span>{reposts}</span>
            </div>
          </div>
        </div>

        <div className={classes.commentSection}>
          {canInteractWithPost && (
            <form className={classes.commentForm} onSubmit={handleCommentSubmit}>
              <Input
                value={commentDraft}
                onChange={e => setCommentDraft(e.target.value)}
                placeholder="Write a comment"
                onClick={e => e.stopPropagation()}
              />
              <Button type="primary" htmlType="submit">Comment</Button>
            </form>
          )}
          {comments.length > 0 && (
            <div className={classes.commentList}>
              {comments.slice(0, 3).map(comment => (
                <div key={comment.id} className={classes.commentItem}>
                  <strong>{comment.author}</strong>
                  <span>{comment.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Post