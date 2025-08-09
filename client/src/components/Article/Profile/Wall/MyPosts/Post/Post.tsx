import React, { ChangeEvent, useRef, useEffect, useCallback } from 'react'
import { Avatar, Typography, Input } from 'antd'
import classes from './Post.module.scss'
import { useAppDispatch } from '../../../../../../hooks/hooks'
import { profileActions } from '../../../../../../BLL/reducer-profile'
import { bufferToUrl } from '../../../../../../utils/helpers/functions/function-helpers'

const { Title, Paragraph } = Typography

interface IPost {
  userName: string
  postTitle: string
  postInf: string
  postImg: string | File
  isEditPostTitle: boolean
  isEditPostInf: boolean
  id: number
  createdAt: string
  likesCount: number
  avatar: string | undefined | File
  isModalOpen: boolean
}

const defaultUserPhoto = import.meta.env.VITE_CLOUDINARY_DEFAULT_USER
const noPostImg = import.meta.env.VITE_CLOUDINARY_NO_PHOTO_URL

const Post: React.FC<IPost> = props => {
  const postContentRef = useRef<HTMLDivElement>(null)

  const dispatch = useAppDispatch()

  const {
    finishEditing,
    setIsPostInfEdited,
    setIsPostTitleEdited,
    onPostTitleChange,
    onPostInfChange
  } = profileActions

  const handleOutsideClick = useCallback((e: MouseEvent) => {
    if (postContentRef.current && !postContentRef.current.contains(e.target as Node)) {
      dispatch(finishEditing())
    }
  }, [finishEditing])

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick)
    return () => document.removeEventListener('click', handleOutsideClick)
  }, [handleOutsideClick])

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(onPostTitleChange({ postId: props.id, postContent: e.currentTarget.value }))

  const handleInfChange = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(onPostInfChange({ postId: props.id, postContent: e.currentTarget.value }))

  const resolveImage = (img: any, fallback: string) => {
    if (typeof img === 'string') return img

    if (img instanceof File) return URL.createObjectURL(img)

    if (img?.data && img?.contentType) {
      return bufferToUrl(img, img.contentType)
    }

    return fallback
  }

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
            <div onClick={() => dispatch(setIsPostTitleEdited({ postId: props.id, status: true }))} className={classes.postTitleContainer}>
              {props.isEditPostTitle ? (
                <Input
                  onChange={handleTitleChange}
                  defaultValue={props.postTitle}
                  placeholder='Post title'
                />
              ) : (
                <Title level={4} className={classes.postTitle}>{props.postTitle}</Title>
              )}
            </div>
            <div className={classes.horizontal_line} />
            <div onClick={() => dispatch(setIsPostInfEdited({ postId: props.id, status: true }))} className={classes.postInfContainer}>
              {props.isEditPostInf ? (
                <Input
                  onChange={handleInfChange}
                  defaultValue={props.postInf}
                  placeholder='Post content'
                />
              ) : (
                <Paragraph className={classes.postInf}>{props.postInf}</Paragraph>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post