import React, { useState, ChangeEvent } from 'react'
import classes from './dialogForm.module.scss'
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import { IconButton } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'

interface PropsType {
    sendMessage: (userId: number, newMessage: string) => void
    userDialogId: number
}

const DialogForm: React.FC<PropsType> = ({ sendMessage, userDialogId }) => {
    const [messageVal, setMessageVal] = useState<string>('')
    const field = React.createRef<HTMLInputElement>()
    const fieldHandleChange = () => {
        field.current && setMessageVal(field.current.value)
    }
    const onInputFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files) {
            const file = e.currentTarget.files[0]
            const photoMessage = URL.createObjectURL(file)
            sendMessage(userDialogId, photoMessage)
        }
    }
    const sendMessageHandler = () => {
        sendMessage(userDialogId, messageVal)
        setMessageVal('')
    }
    return (
        <form>
            <div className={classes.sendMessage}>
                <div className={classes.anotherContentPanel}>
                    <IconButton>
                        <InsertEmoticonIcon className={classes.icon} />
                    </IconButton>
                </div>
                <div className={classes.fieldContent}>
                    <input type="text"
                        placeholder="Enter your message..."
                        name="dialog"
                        value={messageVal}
                        ref={field}
                        onChange={fieldHandleChange} />
                </div>
                <div className={classes.sendPanel}>
                    {messageVal === '' ?
                        <div className={classes.PhotoMessageAbility}>
                                <IconButton>
                                <label htmlFor="dialogImageFileInput"><InsertPhotoIcon className={classes.icon} /></label>
                                </IconButton><input accept="/image*"
                                    name="dialogImage"
                                    id="dialogImageFileInput"
                                    onChange={onInputFileChange}
                                    className={classes.fileInput}
                                    type="file" />
                        </div> : <IconButton onClick={sendMessageHandler}>
                            <SendIcon className={classes.icon} />
                        </IconButton>}
                </div>
            </div>
        </form>
    )
}

export default DialogForm