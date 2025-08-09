import React, { RefObject } from 'react'
import AddNewPhotoComponent from '../../../../../common/AddNewPhotoComponent'
// import { useAddNotificationMutation } from '../../../../../../DAL/notificationApi'
// import { useSetUserPhotoMutation } from '../../../../../../DAL/optionsApi'
// import { useAppSelector } from '../../../../../../hooks/hooks'
// import { selectAuthorizedUserId } from '../../../../../../BLL/selectors/auth-selectors'

interface IChangeBackground {
    setIsModalOpenStatus: React.Dispatch<React.SetStateAction<boolean>>
    // setProfileBackground: (photo: File) => void
}

const ChangeBackground:React.FC<IChangeBackground> = ({ }) => {
    // const userId = useAppSelector(selectAuthorizedUserId)

    // const [createNotification] = useAddNotificationMutation()
    // #
    const error = undefined 
    const getBackgroundFile = (ref: RefObject<HTMLInputElement>) => {
        // const node = ref.current
        // if (node?.files) {
        //     const file = node.files[0]
        //     setProfileBackground(file) // This should be used to update the profile background in the state
        // }
        // setIsModalOpenStatus(false)
        // !error && createNotification({title: 'Background has been changed successfully!', pageUrl:'/Profile', itemType: 'Profile'})
        return false
    }
    return <AddNewPhotoComponent error={error} onChangeFileInputFunction={getBackgroundFile}/>
}

export default ChangeBackground