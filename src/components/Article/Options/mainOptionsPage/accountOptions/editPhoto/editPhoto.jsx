import React from 'react';
import classes from './editPhoto.module.css';
import defaultAvatar from '../../../../Profile/images/withoutAvatar/defaultUserPhoto.jpg';

const EditPhoto = (props) => {
    let filePhotoInput = React.createRef();
    let getUserPhoto = () => {
        let file = filePhotoInput.current.files[0];
        props.setUserPhoto(file);
        console.log(file)
    }
    return (
        <div className={classes.editPhoto}>
                <img alt="" src={props.photo ? props.photo : defaultAvatar} />
                <div className={classes.btn_changeAvatar}>
                    <input accept="image/*" onChange={getUserPhoto} ref={filePhotoInput} type="file" id="filePhotoInput"/>
                    <label htmlFor="filePhotoInput">Change avatar</label>
                </div>
            </div>
    );
}

export default EditPhoto;