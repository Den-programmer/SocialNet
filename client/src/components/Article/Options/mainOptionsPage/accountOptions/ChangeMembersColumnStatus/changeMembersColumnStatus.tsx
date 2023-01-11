import React, { useState } from 'react'
import { IChangeOptions } from '../accountOptions'
import '../../../options.scss'
import { Alert } from '@material-ui/lab'
import CloseIcon from '@material-ui/icons/Close'
import { Snackbar, IconButton, FormControl, Select, MenuItem } from '@material-ui/core'

const ChangeMembersColumnStatus: React.FC<IChangeOptions> = ({ property, isMembersColumnOpen, changeMembersColumnOpenedStatus }) => {
    const [isSuccessfulSnackbarOpen, setIsSuccessfulSnackbarOpenStatus] = useState<boolean>(false)
    return (
        <div className="editContentItem">
            <div className="editContentItem_main">
                <h5 className="editContentItem_property">{property}</h5>
                <div style={{ width: '400px' }}>
                    <FormControl style={{ width: '100px' }}>
                        <Select
                            value={isMembersColumnOpen ? 'opened' : 'closed'}
                        >
                            <MenuItem onClick={() => changeMembersColumnOpenedStatus(true)} value={'opened'}>opened</MenuItem>
                            <MenuItem onClick={() => changeMembersColumnOpenedStatus(false)} value={'closed'}>closed</MenuItem>
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

export default ChangeMembersColumnStatus