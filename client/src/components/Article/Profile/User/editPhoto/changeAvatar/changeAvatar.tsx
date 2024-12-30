import React, { RefObject } from 'react'
import AddNewPhotoComponent from '../../../../../common/AddNewPhotoComponent'

interface IChangeAvatar {
    error: string | null
    setUserPhoto: (photo: File) => void
    createNotification: (title: string | null, pageUrl: string | null, itemType: 'Profile' | 'Messages' | 'Friends' | 'News') => void
    setIsModalOpenStatus: React.Dispatch<React.SetStateAction<boolean>>
}

const ChangeAvatar: React.FC<IChangeAvatar> = ({ error, setUserPhoto, setIsModalOpenStatus, createNotification }) => {
    const getUserPhoto = (ref: RefObject<HTMLInputElement>) => {
        const node = ref.current
        if (node?.files) {
            const file = node.files[0]
            setUserPhoto(file)
        }
        setIsModalOpenStatus(false)
        !error && createNotification('Your avatar has been changed successfully!', '/Profile', 'Profile')
    }
    return <AddNewPhotoComponent error={error} onChangeFileInputFunction={getUserPhoto}/>
}

export default ChangeAvatar