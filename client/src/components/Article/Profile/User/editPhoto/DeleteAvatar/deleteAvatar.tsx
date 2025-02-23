import React from 'react'
import classes from '../changingPhotos.module.scss'
import { Button } from '@material-ui/core'

interface IDeleteAvatar {
    setUserPhoto: (photo: File) => void
    error: string | null
    setIsModalOpenStatus: React.Dispatch<React.SetStateAction<boolean>>
    createNotification: (title: string | null, pageUrl: string | null, itemType: 'Profile' | 'Messages' | 'Friends' | 'News') => void
}

const defaultUser = process.env.REACT_APP_CLOUDINARY_DEFAULT_USER

const DeleteAvatar:React.FC<IDeleteAvatar> = ({ setUserPhoto, setIsModalOpenStatus, createNotification, error }) => {
    const photoFile = new File([defaultUser?defaultUser:''], "defaultUserFile.jpg", {
        type: 'image/jpeg',
        lastModified: 1583871416945
    })

    const deleteAvatar = () => {
        setUserPhoto(photoFile)
        setIsModalOpenStatus(false)
        !error && createNotification('Your avatar has been deleted successfully! Now you have the default!', '/Profile', 'Profile')
    }
    return (
        <div className={classes.deleteAvatar}>
            <p className={classes.text}>
                If you want to delete your current profile photo but not upload a new one, please use the delete profile photo button.
            </p>
            <Button onClick={deleteAvatar} color="primary" variant="contained" component="span">Delete my profile photo</Button>
        </div>
    )
}

export default DeleteAvatar