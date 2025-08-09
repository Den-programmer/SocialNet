import React from 'react'
import classes from '../changingPhotos.module.scss'
import { Button, Typography } from 'antd'
import { useSetUserPhotoMutation } from '../../../../../../DAL/profileApi'
import { useAddNotificationMutation } from '../../../../../../DAL/notificationApi'

interface IDeleteAvatar {
  setIsModalOpenStatus: React.Dispatch<React.SetStateAction<boolean>>
}

const { Paragraph } = Typography

const defaultUser = import.meta.env.VITE_CLOUDINARY_DEFAULT_USER

const DeleteAvatar: React.FC<IDeleteAvatar> = ({ setIsModalOpenStatus }) => {
  const [setUserPhoto, { isLoading: isUserPhotoLoading }] = useSetUserPhotoMutation()
  const [createNotification] = useAddNotificationMutation()
  // #
  const userId = localStorage.getItem('userId') || ''

  const deleteAvatar = async () => {
    try {
      const blob = new Blob([defaultUser?defaultUser:""], { type: 'image/jpeg' })
      const photoFile = new File([blob], 'defaultUserFile.jpg', {
        type: 'image/jpeg',
        lastModified: Date.now()
      })

      await setUserPhoto({ photo: photoFile, userId }).unwrap()

      await createNotification({
        title: 'Your avatar has been deleted successfully! Now you have the default!',
        pageUrl: '/Profile',
        itemType: 'Profile'
      })

      setIsModalOpenStatus(false)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className={classes.deleteAvatar}>
      <Paragraph className={classes.text}>
        If you want to delete your current profile photo but not upload a new one, please use the delete profile photo button.
      </Paragraph>
      <Button type='primary' danger onClick={deleteAvatar} disabled={isUserPhotoLoading}>
        Delete my profile photo
      </Button>
    </div>
  )
}

export default DeleteAvatar