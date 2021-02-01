import React, { RefObject } from 'react'
import AddNewPhotoComponent from '../../../../../common/AddNewPhotoComponent'

interface IChangeBackground {
    error: string | null
    setIsModalOpenStatus: React.Dispatch<React.SetStateAction<boolean>>
    setProfileBackground: (photo: File) => void
    addNotification: (title: string | null, pageUrl: string | null, itemType: 'Profile' | 'Messages' | 'Friends' | 'News') => void
}

const ChangeBackground:React.FC<IChangeBackground> = ({ error, setIsModalOpenStatus, setProfileBackground, addNotification }) => {
    const getBackgroundFile = (ref: RefObject<HTMLInputElement>) => {
        const node = ref.current
        if (node?.files) {
            const file = node.files[0]
            setProfileBackground(file)
        }
        setIsModalOpenStatus(false)
        !error && addNotification('Background has been changed successfully!', '/Profile', 'Profile')
    }
    return <AddNewPhotoComponent error={error} onChangeFileInputFunction={getBackgroundFile}/>
}

export default ChangeBackground