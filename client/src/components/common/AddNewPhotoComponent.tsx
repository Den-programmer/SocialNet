import React, { useRef, useEffect, useState, RefObject } from 'react'
import { Button, Typography } from 'antd'
import classes from '../Article/Profile/User/editPhoto/changingPhotos.module.scss'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { SerializedError } from '@reduxjs/toolkit'

const { Text } = Typography

interface IAddNewPhotoComponent {
  error: FetchBaseQueryError | SerializedError | undefined
  isLoading?: boolean
  onChangeFileInputFunction: (ref: RefObject<HTMLInputElement>) => void
}

const AddNewPhotoComponent: React.FC<IAddNewPhotoComponent> = ({ onChangeFileInputFunction, error, isLoading }) => {
  const filePhotoInput = useRef<HTMLInputElement>(null)
  const dropzone = useRef<HTMLDivElement>(null)
  const [isActive, setIsActiveStatus] = useState(false)

  useEffect(() => {
    const node = dropzone.current
    const fileInput = filePhotoInput.current
    if (!node || !fileInput) return

    const handleDragOver = (e: DragEvent) => e.preventDefault()
    const handleDrop = (e: DragEvent) => {
      e.preventDefault()
      if (e.dataTransfer) {
        const file = e.dataTransfer.files[0]
        const dT = new DataTransfer()
        dT.items.add(file)
        fileInput.files = dT.files
        onChangeFileInputFunction(filePhotoInput as RefObject<HTMLInputElement>)
      }
    }

    node.addEventListener('dragover', handleDragOver)
    node.addEventListener('dragenter', handleDragOver)
    node.addEventListener('drop', handleDrop)

    return () => {
      node.removeEventListener('dragover', handleDragOver)
      node.removeEventListener('dragenter', handleDragOver)
      node.removeEventListener('drop', handleDrop)
    }
  }, [onChangeFileInputFunction])

  const handleSelectClick = () => {
    filePhotoInput.current?.click()
  }

  return (
    <div
      ref={dropzone}
      className={isActive ? classes.containerActive : classes.container}
      onDragEnter={() => setIsActiveStatus(true)}
      onDragLeave={() => setIsActiveStatus(false)}
    >
      <div className={classes.mainContent}>
        <h4 className={classes.title}>Drop your file</h4>
        <p className={classes.mainContent_text}>or</p>
        <input
          id="filePhotoInput"
          type="file"
          accept="image/*"
          ref={filePhotoInput}
          className={classes.hidden_textfield}
          onChange={() => onChangeFileInputFunction(filePhotoInput as RefObject<HTMLInputElement>)}
        />
        <Button type="primary" disabled={isLoading} onClick={handleSelectClick}>
          Select your file
        </Button>
      </div>
      {error && <Text type="danger" style={{ marginTop: '8px' }}>{error.toString()}</Text>}
    </div>
  )
}

export default AddNewPhotoComponent