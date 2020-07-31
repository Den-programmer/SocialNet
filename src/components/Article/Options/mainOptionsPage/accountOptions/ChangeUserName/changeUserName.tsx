import React from 'react'
import classes from './changeUserName.module.css'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { contactsType, saveProfileType } from '../../../../../../BLL/reducer-profile'
import Btn_Confirm from '../../../../../common/Btns/Btn_confirm/btn_confirm'

interface IChangeUserName {
    userName: string
    contacts: contactsType
    saveProfile: (profile: saveProfileType) => void
    changeUserName: (userName: string) => void
}

const ChangeUserName: React.FC<IChangeUserName> = (props) => {
    let changeNameInput = React.createRef<HTMLInputElement>()

    const [userName, setUserName] = useState<string>(props.userName)

    const [isInputTouched, setInputStatus] = useState<boolean>(false)

    const onUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputStatus(true)
        setUserName(e.currentTarget.value)
    }
    const changeUserName = () => {
        const node = changeNameInput.current
        if (node) {
            let userNameVal = node.value
            let profile = {
                fullName: userNameVal,
                contacts: props.contacts
            }
            props.saveProfile(profile)
            props.changeUserName(userNameVal)
        }
        setInputStatus(false)
    }

    return (
        <div className={classes.changeUserName}>
            <input ref={changeNameInput}
                onChange={onUserNameChange}
                type="text" value={userName} />
            <div className={classes.btn_confirmChanges}>
                {isInputTouched && <NavLink to={"/Profile"}>
                    <Btn_Confirm clickFunction={changeUserName}/>
                </NavLink>}
            </div>
        </div>
    )
}

export default ChangeUserName