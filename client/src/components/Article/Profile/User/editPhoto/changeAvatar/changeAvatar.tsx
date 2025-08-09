import React, { RefObject } from 'react'
import AddNewPhotoComponent from '../../../../../common/AddNewPhotoComponent'
import { useAddNotificationMutation } from '../../../../../../DAL/notificationApi'
import { useSetUserPhotoMutation } from '../../../../../../DAL/profileApi'
import { useAppSelector } from '../../../../../../hooks/hooks'
import { selectAuthorizedUserId } from '../../../../../../BLL/selectors/auth-selectors'

interface IChangeAvatar {
  setIsModalOpenStatus: React.Dispatch<React.SetStateAction<boolean>>
}

const ChangeAvatar: React.FC<IChangeAvatar> = ({ setIsModalOpenStatus }) => {
  const [createNotification] = useAddNotificationMutation()
  const [setUserPhoto, { isLoading, error }] = useSetUserPhotoMutation()

  const authorizedUserId = useAppSelector(selectAuthorizedUserId)

  const getUserPhoto = async (ref: RefObject<HTMLInputElement>) => {
    const node = ref.current
    if (node?.files && node.files.length > 0) {
      const file = node.files[0]
      let userDataLS = localStorage.getItem('userData')
      let userId = userDataLS ? JSON.parse(userDataLS).userId : ''
      try {
        await setUserPhoto({
          photo: file,
          userId:userId || authorizedUserId
        }).unwrap()

        await createNotification({
          title: 'Your avatar has been changed successfully!',
          pageUrl: '/Profile',
          itemType: 'Profile'
        })

        setIsModalOpenStatus(false)
      } catch {}
    }
  }

  return (
    <AddNewPhotoComponent
      error={error}
      isLoading={isLoading}
      onChangeFileInputFunction={getUserPhoto}
    />
  )
}

export default ChangeAvatar