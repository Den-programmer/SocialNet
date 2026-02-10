import React, { ChangeEvent, useRef, useEffect, useCallback } from 'react'
import { Avatar, Typography, Input, Button, message } from 'antd'
import classes from './Post.module.scss'
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/hooks'
import { profileActions } from '../../../../../../BLL/reducer-profile'
import { bufferToUrl } from '../../../../../../utils/helpers/functions/function-helpers'
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

  const { startEdit, updateDraft, finishEdit } =
    profileActions

  const [updatePostTitle, { isLoading: isUpdatingTitle }] = useUpdatePostTitleMutation()
  const [updatePostInf, { isLoading: isUpdatingInf }] = useUpdatePostInformatMutation()

  const isLoading = isUpdatingTitle || isUpdatingInf

  const postEdit = useAppSelector(state =>
    selectPostEdits(state, props._id)
  ) ?? {
    isEditing: false,
    draftTitle: '',
    draftInf: ''
  }

  const saveChanges = useCallback(async () => {
    if (!postEdit?.isEditing) return

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
      if (error) {
        message.warning(error)
        return
      }
    }

    if (infChanged) {
      const error = runValidators(inf, infValidators)
      if (error) {
        message.warning(error)
        return
      }
    }

    try {
      if (titleChanged) {
        await updatePostTitle({
          postId: props._id,
          newTitle: title
        }).unwrap()
      }

      if (infChanged) {
        await updatePostInf({
          postId: props._id,
          newInformat: inf
        }).unwrap()
      }

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
  const handleOutsideClick = useCallback(
    (e: MouseEvent) => {
      if (
        postContentRef.current &&
        !postContentRef.current.contains(e.target as Node)
      ) {
        saveChanges()
      }
    },
    [saveChanges]
  )

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick)
    return () => document.removeEventListener('click', handleOutsideClick)
  }, [handleOutsideClick])

  const resolveImage = (img: any, fallback: string) => {
    if (typeof img === 'string') return img
    if (img instanceof File) return URL.createObjectURL(img)
    if (img?.data && img?.contentType) {
      return bufferToUrl(img, img.contentType)
    }
    return fallback
  }


  const handleStartEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch(startEdit(props._id))
  }

  const handleChange =
    (field: 'title' | 'inf') =>
      (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(
          updateDraft({
            postId: props._id,
            field,
            value: e.target.value
          })
        )
      }

  const handleConfirm = async () => {
    await saveChanges()
  }

  const hasChanges =
  postEdit.draftTitle !== props.postTitle ||
  postEdit.draftInf !== props.postInf

  const postImage = resolveImage(props.postImg, noPostImg)
  const avatarImage = resolveImage(props.avatar, defaultUserPhoto)

  return (
    <div className={classes.post}>
      <div className={classes.postHeaderWrapper}>
        <div className={classes.postHeader}>
          <div className={classes.avatar}>
            <Avatar size={64} src={avatarImage} />
            <h6>{props.userName}</h6>
          </div>

          <div className={classes.date}>
            <p>{props.createdAt}</p>
          </div>
        </div>
      </div>

      <div className={classes.postBody}>
        <div className={classes.picture}>
          <img src={postImage} alt='post visual' />
        </div>

        <div className={classes.postContentWrapper}>
          <div ref={postContentRef} className={classes.postContent}>

            <div
              className={classes.postTitleContainer}
              onClick={handleStartEdit}
            >
              {postEdit.isEditing ? (
                <Input
                  value={postEdit.draftTitle}
                  name='postTitle'
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange('title')(e)
                  }
                  placeholder='Post title'
                />
              ) : (
                <Title level={4} className={classes.postTitle}>
                  {props.postTitle}
                </Title>
              )}
            </div>

            <div className={classes.horizontal_line} />

            <div
              className={classes.postInfContainer}
              onClick={handleStartEdit}
            >
              {postEdit.isEditing ? (
                <Input
                  value={postEdit.draftInf}
                  name='postInf'
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange('inf')(e)
                  }
                  placeholder='Post content'
                />
              ) : (
                <Paragraph className={classes.postInf}>
                  {props.postInf}
                </Paragraph>
              )}
            </div>

          </div>
        </div>
      </div>

      <div className={classes.postFooter}>
        {postEdit.isEditing && <Button
          type='primary'
          disabled={!postEdit.isEditing || !hasChanges || isLoading}
          onClick={handleConfirm}
          loading={isLoading}
        >
          Confirm
        </Button>}
      </div>
    </div>
  )
}

export default Post