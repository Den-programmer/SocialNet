import React, { useState } from 'react'
import classes from './changeUserName.module.scss'
import { IAccountOption, IChangeOptions } from '../accountOptions'
import { createReviewChangesBtn } from '../../../../../../utils/helpers/functions/function-helpers'

const ChangeUserName: React.FC<IChangeOptions> = (props) => {
    const [userName, setUserName] = useState<string>(props.userName)
    const changeUserName = () => {
        let profile = {
            fullName: userName,
            contacts: props.contacts
        }
        props.saveProfile(profile)
        props.changeUserName(userName)

        let array = props.accountOptionsMenu.map((item: IAccountOption) => {
            return { ...item, isEdit: false }
        })
        props.setChangesToAccountOptionsMenu(array)
    }
    const onUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.currentTarget.value)
    }
    return (
        <div className={classes.editContentItem}>
            <div className={classes.editContentItem_main}>
                <h5 className={classes.editContentItem_property}>{props.property}</h5>
                <div className={classes.editContentItem_editInput}>
                    <input onChange={onUserNameChange}
                        type="text" value={userName} />
                </div>
            </div>
            {createReviewChangesBtn(changeUserName, '/Profile')}
        </div>
    )
}

export default ChangeUserName