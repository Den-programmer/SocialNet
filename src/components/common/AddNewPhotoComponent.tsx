import React, { RefObject } from 'react'
import classes from '../Article/Profile/User/editPhoto/changingPhotos.module.scss'
import { Button } from '@material-ui/core'

interface IAddNewPhotoComponent {
    error: string | null
    onChangeFileInputFunction: (ref: RefObject<HTMLInputElement>) => void
}

const AddNewPhotoComponent: React.FC<IAddNewPhotoComponent> = ({ onChangeFileInputFunction, error }) => {
    const filePhotoInput = React.createRef<HTMLInputElement>()
    return (
        <div className={classes.container}>
            <div className={classes.mainContent}>
                <h4 className={classes.title}>Drop your file</h4>
                <p className={classes.mainContent_text}>or</p>
                <input className={classes.hidden_textfield} accept="image/*" onChange={() => onChangeFileInputFunction(filePhotoInput)}
                    ref={filePhotoInput} type="file"
                    id="filePhotoInput" />
                <label htmlFor="filePhotoInput">
                    <Button component="span" color="secondary" variant="contained">Select your file</Button>
                </label>
            </div>
        </div>
    )
}

export default AddNewPhotoComponent