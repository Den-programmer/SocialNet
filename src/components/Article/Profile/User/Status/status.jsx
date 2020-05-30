import React from 'react';
import classes from './status.module.css';
import { useState, useEffect } from 'react';

const Status = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    let activateEditMode = () => {
        setEditMode(true);
    }
    let deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }
    let onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    }

    return (
        <div className={classes.status}>
            {editMode ?
                <div className={classes.editCurrentStatus}>
                    <input value={status} onChange={onStatusChange} autoFocus={true}  type="text" 
                    placeholder={"Edit status..."} 
                    title="Edit Status..." 
                    onBlur={deactivateEditMode}/>
                </div>
                :
                <div className={classes.currentStatus}>
                    <span onClick={activateEditMode} title="Edit status...">{props.status}</span>
                </div>
            }
        </div>
    );
}

export default Status;