import React, { useState } from 'react'
import { IAccountOption, IChangeOptions } from '../accountOptions'
import { createReviewChangesBtn } from '../../../../../../utils/helpers/functions/function-helpers'
import { Snackbar, IconButton } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import CloseIcon from '@material-ui/icons/Close'

const ChangeUserName: React.FC<IChangeOptions> = (props) => {
    const [isSnakbarOpen, setIsSnackbarOpenStatus] = useState(true)
    const [isSuccessfulSnackbarOpen, setIsSuccessfulSnackbarOpenStatus] = useState(false)
    const [userName, setUserName] = useState<string>(props.userName)
    const changeUserName = () => {
        props.changeUserName(props.userId, userName)

        let array = props.accountOptionsMenu.map((item: IAccountOption) => {
            return { ...item, isEdit: false }
        })
        props.setChangesToAccountOptionsMenu(array)
        setIsSuccessfulSnackbarOpenStatus(true)
        props.createNotification('Your nickname has been changed successfully! Now you\'re are ' + userName, '/Profile', 'Profile')
    }
    const onUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.currentTarget.value)
    }
    return (
        <div className="editContentItem">
            <div className="editContentItem_main">
                <h5 className="editContentItem_property">{props.property}</h5>
                <div className="editContentItem_editInput">
                    <input onChange={onUserNameChange}
                        type="text" value={userName} />
                </div>
            </div>
            {createReviewChangesBtn(changeUserName, '/Profile')}
            <Snackbar open={isSnakbarOpen} action={
                <IconButton size="small" onClick={() => setIsSnackbarOpenStatus(false)} color="inherit">
                    <CloseIcon fontSize="small" />
                </IconButton>
            } anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} message={userName} />
            <Snackbar open={isSuccessfulSnackbarOpen} autoHideDuration={4000} onClose={() => setIsSuccessfulSnackbarOpenStatus(false)}>
                <Alert action={
                    <IconButton size="small" onClick={() => setIsSuccessfulSnackbarOpenStatus(false)} color="inherit">
                        <CloseIcon fontSize="small" />
                    </IconButton>
                } variant="filled" severity="success">
                    This is a success message!
                </Alert>
            </Snackbar>
        </div>
    )
}

export default ChangeUserName