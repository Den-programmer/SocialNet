import React, { ChangeEvent, useState } from 'react'
import { IChangeOptions } from '../accountOptions'
import '../../../options.scss'
import { createReviewChangesBtn } from '../../../../../../utils/helpers/functions/function-helpers'
import { Alert } from '@material-ui/lab'
import CloseIcon from '@material-ui/icons/Close'
import { Snackbar, IconButton } from '@material-ui/core'

const ChangeMembersColumnStatus: React.FC<IChangeOptions> = ({ property, isMembersColumnOpen, changeMembersColumnOpenedStatus }) => {
    const [membersStatusStr, setMembersStatusStr] = useState<string>(isMembersColumnOpen ? 'opened' : 'closed')
    const [isSuccessfulSnackbarOpen, setIsSuccessfulSnackbarOpenStatus] = useState<boolean>(false)
    const onChangeMembersColumnStatus = (e: ChangeEvent<HTMLSelectElement>) => setMembersStatusStr(e.currentTarget.value)
    return (
        <div className="editContentItem">
            <div className="editContentItem_main">
                <h5 className="editContentItem_property">{property}</h5>
                <div style={{ width: '400px' }}>
                    <select onChange={onChangeMembersColumnStatus}>
                        <option value='opened' selected={membersStatusStr === 'opened' ? true : false}>opened</option>
                        <option value='closed' selected={membersStatusStr === 'closed' ? true : false}>closed</option>
                    </select>
                </div>
            </div>
            {createReviewChangesBtn(() => changeMembersColumnOpenedStatus(membersStatusStr === 'opened' ? true : false), '/Profile')}
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