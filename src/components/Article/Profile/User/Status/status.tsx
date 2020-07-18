import React from 'react'
import classes from './status.module.css'
import { useState, useEffect } from 'react'

interface IStatus {
    status: string
    updateStatus: (status: string) => void
}

const Status: React.FC<IStatus> = (props) => {

    let [editMode, setEditMode] = useState<boolean>(false)
    let [status, setStatus] = useState<string>(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    let activateEditMode = () => {
        setEditMode(true)
    }
    let deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }
    let onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
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
    )
}

export default Status