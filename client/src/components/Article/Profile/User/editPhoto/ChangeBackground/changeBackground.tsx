import React, { RefObject } from 'react'
import AddNewPhotoComponent from '../../../../../common/AddNewPhotoComponent'
import { useAddNotificationMutation } from '../../../../../../DAL/notificationApi'
import { useAppSelector } from '../../../../../../hooks/hooks'
import { selectAuthorizedUserId } from '../../../../../../BLL/selectors/auth-selectors'
import { useSetUserBackgroundMutation } from '../../../../../../DAL/profileApi'

interface IChangeBackground {
    setIsModalOpenStatus: React.Dispatch<React.SetStateAction<boolean>>
}

const ChangeBackground: React.FC<IChangeBackground> = ({ setIsModalOpenStatus }) => {
    const authorizedUserId = useAppSelector(selectAuthorizedUserId)
    const [createNotification] = useAddNotificationMutation()
    const [setUserBackground] = useSetUserBackgroundMutation()
    const error = undefined
    const getBackgroundFile = async (ref: RefObject<HTMLInputElement>) => {
        const node = ref.current
        if (node?.files) {
            const file = node.files[0]
            const userDataLS = localStorage.getItem('userData')
            const userId = userDataLS ? JSON.parse(userDataLS).userId : authorizedUserId

            try {
                await setUserBackground({ photo: file, userId }).unwrap()

                await createNotification({
                    title: 'Your avatar has been changed successfully!',
                    pageUrl: '/Profile',
                    itemType: 'Profile'
                })

                setIsModalOpenStatus(false)
            } catch { }

        }
        setIsModalOpenStatus(false)
        !error && createNotification({ title: 'Background has been changed successfully!', pageUrl: '/Profile', itemType: 'Profile' })
        return false
    }
    return <AddNewPhotoComponent error={error} onChangeFileInputFunction={getBackgroundFile} />
}

export default ChangeBackground