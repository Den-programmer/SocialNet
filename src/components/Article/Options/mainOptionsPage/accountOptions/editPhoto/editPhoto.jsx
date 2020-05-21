import React from 'react';
import classes from './editPhoto.module.css';
import defaultAvatar from '../../../../Profile/images/withoutAvatar/defaultUserPhoto.jpg';

const EditPhoto = (props) => {
    return (
        <div className={classes.editPhoto}>
                <img alt="" src={props.photo ? props.photo : defaultAvatar} />
                <div className={classes.btn_changeAvatar}>
                    <button>
                        Change avatar
                    </button>
                    <input type="file" />
                </div>
            </div>
    );
}

export default EditPhoto;