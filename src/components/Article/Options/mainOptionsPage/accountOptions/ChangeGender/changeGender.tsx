import React, { useState, ChangeEvent } from 'react'
import classes from './changeGender.module.scss'
import { Snackbar, IconButton } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import CloseIcon from '@material-ui/icons/Close'
import { IChangeOptions } from '../accountOptions'
import { createReviewChangesBtn } from '../../../../../../utils/helpers/functions/function-helpers'

const ChangeGender: React.FC<IChangeOptions> = (props) => {
    const select = React.createRef<HTMLSelectElement>()
    const [gender, setGender] = useState<string>('Not Chosen')
    const [isSuccessfulSnackbarOpen, setIsSuccessfulSnackbarOpenStatus] = useState<boolean>(false)
    const onGenderChange = (e: ChangeEvent<HTMLSelectElement>) => setGender(e.currentTarget.value)
    const changeGender = (gender: string) => {
        props.changeGender(gender)
        props.addNotification('You have changed your gender! Now you\'re ' + gender, '/Profile', 'Profile')
    }
    return (
        <div className={classes.changeGender}>
            <div className={classes.changeGender_content}>
                <h5 className={classes.property}>{props.property}</h5>
                <div className={classes.selectList}>
                    <select onChange={onGenderChange} ref={select}>
                        <option value='Not Chosen' selected={props.gender === 'Not Chosen' && true}>Not Chosen</option>
                        <option value='Male' selected={props.gender === 'Male' && true}>Male</option>
                        <option value='Female' selected={props.gender === 'Female' && true}>Female</option>
                    </select>
                </div>
            </div>
            {createReviewChangesBtn(() => changeGender(gender), '/Profile')}
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