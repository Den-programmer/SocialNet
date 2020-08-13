import React from 'react'
import classes from './editPhoto.module.css'
import defaultAvatar from '../../../../Profile/images/withoutAvatar/defaultUserPhoto.jpg'

interface IEditPhoto {
    error: string | null
    setUserPhoto: (photo: File) => void
    photo: string | undefined
}

const EditPhoto: React.FC<IEditPhoto> = ({error, setUserPhoto, photo}) => {
    const filePhotoInput = React.createRef<HTMLInputElement>()
    const getUserPhoto = () => {
        const node = filePhotoInput.current
        if(node?.files) {
            const file = node.files[0]
            setUserPhoto(file)
        }
    }
    return (
        <div className={classes.editPhoto}>
            <img alt="" src={photo ? photo : defaultAvatar} />
            <div className={classes.btn_changeAvatar}>
                <input accept="image/*" onChange={getUserPhoto} ref={filePhotoInput} type="file" id="filePhotoInput" />
                <label htmlFor="filePhotoInput">Change avatar</label>
            </div>
            {error && <div className={classes.error}>
                {error}
            </div>}
        </div>
    )
}

export default EditPhoto