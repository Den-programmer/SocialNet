import React, { ChangeEvent, useRef, useEffect, useCallback, useState } from 'react'
import { Avatar, Typography, Input, Button, message, Space } from 'antd'
import { LikeOutlined, MessageOutlined, ShareAltOutlined, HeartFilled } from '@ant-design/icons'
import classes from './Post.module.scss'
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/hooks'
import { profileActions } from '../../../../../../BLL/reducer-profile'
import {
  useUpdatePostTitleMutation,
  useUpdatePostInformatMutation
} from '../../../../../../DAL/profileApi'
import { selectPostEdits } from '../../../../../../BLL/selectors/profile-selectors'
import { enteredNothingError, FieldValidator, maxLengthCreator, minLengthCreator, required, runValidators } from '../../../../../../utils/validators/validators'

const { Title, Paragraph } = Typography

interface IPost {
  userName: string
  postTitle: string
  postInf: string
  postImg: string | File
  id: string
  _id: string
  createdAt: string
  likesCount: number
  avatar: string | undefined | File
  isModalOpen: boolean
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

  const [updatePostTitle, { isLoading: isUpdatingTitle }] = useUpdatePostTitleMutation()
  const [updatePostInf, { isLoading: isUpdatingInf }] = useUpdatePostInformatMutation()

  const isLoading = isUpdatingTitle || isUpdatingInf

  const [avatarImage, setAvatarImage] = useState<string>(props.avatar || defaultUserPhoto)
  const [postImage, setPostImage] = useState<string>(noPostImg)
  const [liked, setLiked] = useState<boolean>(false)
  const [likes, setLikes] = useState<number>(props.likesCount || 0)

  const resolveImage = useCallback((img: string | File | undefined | null, fallback: string): string => {
    if (!img) return fallback
    if (typeof img === 'string') return img
    if (img instanceof File) return URL.createObjectURL(img)
    return fallback
  }, [])

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
    selectPostEdits(state, props._id)
  ) ?? { isEditing: false, draftTitle: '', draftInf: '' }

  const saveChanges = useCallback(async () => {
    if (!postEdit.isEditing) return

    const title = postEdit.draftTitle.trim()
    const inf = postEdit.draftInf.trim()
    const titleChanged = title !== props.postTitle
    const infChanged = inf !== props.postInf

    if (!titleChanged && !infChanged) {
      dispatch(finishEdit(props._id))
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
      if (titleChanged) await updatePostTitle({ postId: props._id, newTitle: title }).unwrap()
      if (infChanged) await updatePostInf({ postId: props._id, newInformat: inf }).unwrap()
      message.success('Post updated')
    } catch (err) {
      console.error(err)
      message.error('Failed to update post')
    } finally {
      dispatch(finishEdit(props._id))
    }
  }, [
    postEdit,
    props._id,
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
    e.stopPropagation()
    dispatch(startEdit(props._id))
  }

  const handleChange = (field: 'title' | 'inf') => (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateDraft({ postId: props._id, field, value: e.target.value }))
  }

  const handleConfirm = async () => { await saveChanges() }
  const hasChanges = postEdit.draftTitle !== props.postTitle || postEdit.draftInf !== props.postInf

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    setLiked(prev => {
      const next = !prev
      setLikes(l => l + (next ? 1 : -1))
      return next
    })
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
            </div>
          </div>
          <div className={classes.headerRight} />
        </div>

        <div className={classes.body} onClick={handleStartEdit}>
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
          <div className={classes.actions} onClick={e => e.stopPropagation()}>
            <Space>
              <Button type="text" icon={<LikeOutlined />} onClick={toggleLike} />
              <Button type="text" icon={<MessageOutlined />} />
              <Button type="text" icon={<ShareAltOutlined />} />
            </Space>
          </div>

          <div className={classes.reactions}>
            <div className={classes.reactionBadge}>
              <HeartFilled style={{ color: '#ff4d4f', marginRight: 6 }} />
              <span>{likes}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post