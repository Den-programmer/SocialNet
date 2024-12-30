import React, { useState } from 'react'
import classes from './changeGender.module.scss'
import { Snackbar, IconButton, FormControl, Select, MenuItem } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import CloseIcon from '@material-ui/icons/Close'
import { IChangeOptions } from '../accountOptions'

const ChangeGender: React.FC<IChangeOptions> = (props) => {
    const [isSuccessfulSnackbarOpen, setIsSuccessfulSnackbarOpenStatus] = useState<boolean>(false)
    const changeGender = (gender: string) => {
        props.setGender(gender, props.userId)
        props.createNotification('You have changed your gender! Now you\'re ' + gender, '/Profile', 'Profile')
    }
    return (
        <div className={classes.changeGender}>
            <div className={classes.changeGender_content}>
                <h5 className={classes.property}>{props.property}</h5>
                <div className={classes.selectList}>
                    <FormControl style={{ width: '100px' }}>
                        <Select
                            value={props.gender}
                        >
                            <MenuItem onClick={() => changeGender('Not Chosen')} value={'Not Chosen'}>Not Chosen</MenuItem>
                            <MenuItem onClick={() => changeGender('Male')} value={'Male'}>Male</MenuItem>
                            <MenuItem onClick={() => changeGender('Female')} value={'Female'}>Female</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
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

export default ChangeGender