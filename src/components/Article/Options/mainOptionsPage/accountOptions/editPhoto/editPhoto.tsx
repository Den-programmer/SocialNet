import React from 'react'
import classes from './editPhoto.module.css'
import defaultAvatar from '../../../../Profile/images/withoutAvatar/defaultUserPhoto.jpg'

interface IEditPhoto {
    error: string | null
    setUserPhoto: (photo: any) => void
    photo: any | null
}

const EditPhoto: React.FC<IEditPhoto> = ({error, setUserPhoto, photo}) => {
    let filePhotoInput = React.createRef<HTMLInputElement>()
    let getUserPhoto = () => {
        let node = filePhotoInput.current
        if(node) {
            // @ts-ignorets-ignore
            let file = node.files[0]
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