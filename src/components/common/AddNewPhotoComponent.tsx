import React, { RefObject, useEffect, useState } from 'react'
import classes from '../Article/Profile/User/editPhoto/changingPhotos.module.scss'
import { Button } from '@material-ui/core'

interface IAddNewPhotoComponent {
    error: string | null
    onChangeFileInputFunction: (ref: RefObject<HTMLInputElement>) => void
}

const AddNewPhotoComponent: React.FC<IAddNewPhotoComponent> = ({ onChangeFileInputFunction, error }) => {
    const filePhotoInput = React.createRef<HTMLInputElement>()
    const dropzone = React.createRef<HTMLDivElement>()
    const [isActive, setIsActiveStatus] = useState<boolean>(false)
    useEffect(() => {
        let node = dropzone.current
        let fileInput = filePhotoInput.current

        if (node && fileInput) {
            node.ondragover = node.ondragenter = (e: DragEvent) => {
                e.preventDefault()
            }

            node.ondrop = (e: DragEvent) => {
                if (e.dataTransfer && fileInput) {
                    fileInput.files = e.dataTransfer.files
                    const dT = new DataTransfer()
                    dT.items.add(e.dataTransfer.files[0])
                    fileInput.files = dT.files
                    onChangeFileInputFunction(filePhotoInput)

                    e.preventDefault()
                }
            }
        }
    })
    return (
        <div ref={dropzone} onDragEnter={() => setIsActiveStatus(true)} onDragLeave={() => setIsActiveStatus(false)} className={isActive ? classes.containerActive : classes.container}>
            <div onDragEnter={() => setIsActiveStatus(true)} className={classes.mainContent}>
                <h4 onDragEnter={() => setIsActiveStatus(true)} className={classes.title}>Drop your file</h4>
                <p onDragEnter={() => setIsActiveStatus(true)} className={classes.mainContent_text}>or</p>
                <input className={classes.hidden_textfield} accept="image/*" onChange={() => onChangeFileInputFunction(filePhotoInput)}
                    ref={filePhotoInput} type="file"
                    id="filePhotoInput" />
                <label onDragEnter={() => setIsActiveStatus(true)} htmlFor="filePhotoInput">
                    <Button onDragEnter={() => setIsActiveStatus(true)} component="span" color="secondary" variant="contained">Select your file</Button>
                </label>
            </div>
        </div>
    )
}

export default AddNewPhotoComponent