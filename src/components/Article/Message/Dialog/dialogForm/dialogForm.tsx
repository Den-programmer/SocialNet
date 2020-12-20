import React, { useState } from 'react'
import classes from './dialogForm.module.scss'
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import { IconButton } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'

interface PropsType { 
    addMessage: (newMessage: string) => void
}

const DialogForm: React.FC<PropsType> = ({ addMessage }) => {
    const [messageVal, setMessageVal] = useState<string>('')
    const field = React.createRef<HTMLInputElement>()
    const fieldHandleChange = () => {
        field.current && setMessageVal(field.current.value)
    }
    const sendMessage = () => {
        addMessage(messageVal)
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
                    {messageVal === '' ? <IconButton>
                        <InsertPhotoIcon className={classes.icon} />
                    </IconButton> : <IconButton onClick={sendMessage}>
                        <SendIcon className={classes.icon} />
                    </IconButton>}
                </div>
            </div>
        </form>
    )
}

export default DialogForm