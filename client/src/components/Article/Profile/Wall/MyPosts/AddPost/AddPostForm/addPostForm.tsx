import React, { ChangeEvent, DragEvent, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CameraOutlined, CloseOutlined } from '@ant-design/icons'
import classes from './addPostForm.module.css'
import { AddPostFD } from '../addPost'

interface IAddPostForm {
  setIsAddPostWindowOpen: (status: boolean) => void
  getPostImg: (photo: File) => void
  postPhoto: string
  postPhotoError: string
  onSubmit: (data: AddPostFD) => void
}

const MAX_DESCRIPTION_LENGTH = 2000

const AddPostForm: React.FC<IAddPostForm> = ({
  setIsAddPostWindowOpen,
  getPostImg,
  postPhoto,
  postPhotoError,
  onSubmit
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const { register, handleSubmit, watch, formState: { errors } } = useForm<AddPostFD>()
  const postInfValue = watch('postInf') || ''

  const closeModalWindow = () => setIsAddPostWindowOpen(false)

  const handleFile = (file: File | undefined) => {
    if (file && file.type.startsWith('image/')) {
      getPostImg(file)
    }
  }

  const onInputFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFile(e.currentTarget.files?.[0])
  }

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    handleFile(e.dataTransfer.files?.[0])
  }

  const openFilePicker = () => fileInputRef.current?.click()

  return (
    <form className={classes.postForm} onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <button type="button" className={classes.closeBtn} onClick={closeModalWindow} aria-label="Close">
        <CloseOutlined />
      </button>

      <h2 className={classes.title}>Create a Captivating New Post</h2>

      <div
        className={`${classes.dropzone} ${isDragging ? classes.dropzoneActive : ''} ${postPhoto ? classes.dropzoneHasPhoto : ''}`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={openFilePicker}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && openFilePicker()}
      >
        {postPhoto ? (
          <img loading="lazy" src={postPhoto} alt="Post preview" className={classes.preview} />
        ) : (
          <>
            <CameraOutlined className={classes.cameraIcon} />
            <p className={classes.dropText}>Drag &amp; Drop Photo Here</p>
            <p className={classes.browseText}>
              or Click to <span>Browse</span>
            </p>
          </>
        )}

        <button
          type="button"
          className={classes.selectPhotoBtn}
          onClick={e => {
            e.stopPropagation()
            openFilePicker()
          }}
        >
          Select photo
        </button>

        <input
          ref={fileInputRef}
          onChange={onInputFileChange}
          type="file"
          accept="image/*"
          className={classes.hiddenInput}
        />
      </div>

      {postPhotoError && (
        <div className={classes.error}>
          <span>{postPhotoError}</span>
        </div>
      )}

      <div className={classes.field}>
        <input
          className={classes.input}
          placeholder="Enter post name"
          type="text"
          {...register('postName', {
            required: 'Post name is required',
            maxLength: { value: 200, message: 'Post name must be less than 200 characters' }
          })}
        />
        {errors.postName && <span className={classes.messageError}>{errors.postName.message}</span>}
      </div>

      <div className={classes.field}>
        <label className={classes.label} htmlFor="postDescription">
          Enter post description
        </label>
        <textarea
          id="postDescription"
          className={classes.textarea}
          placeholder=""
          maxLength={MAX_DESCRIPTION_LENGTH}
          {...register('postInf', {
            required: 'Post description is required',
            maxLength: { value: MAX_DESCRIPTION_LENGTH, message: `Description must be less than ${MAX_DESCRIPTION_LENGTH} characters` }
          })}
        />
        <span className={classes.charCount}>
          {postInfValue.length}/{MAX_DESCRIPTION_LENGTH}
        </span>
        {errors.postInf && <span className={classes.messageError}>{errors.postInf.message}</span>}
      </div>

      <div className={classes.footer}>
        <button type="button" className={classes.cancelBtn} onClick={closeModalWindow}>
          Cancel
        </button>
        <button type="submit" className={classes.addPostBtn}>
          Add Post
        </button>
      </div>
    </form>
  )
}

export default AddPostForm
