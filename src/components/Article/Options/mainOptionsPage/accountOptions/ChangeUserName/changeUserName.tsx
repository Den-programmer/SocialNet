import React from 'react'
import classes from './changeUserName.module.css'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { contactsType, saveProfileType } from '../../../../../../BLL/reducer-profile'

interface IChangeUserName {
    userName: string
    contacts: contactsType
    saveProfile: (profile: saveProfileType) => void
    changeUserName: (userName: string) => void
}

const ChangeUserName: React.FC<IChangeUserName> = (props) => {
    let changeNameInput = React.createRef<HTMLInputElement>()

    const [userName, setUserName] = useState<string>(props.userName)

    const onUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.currentTarget.value);
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
    }

    return (
        <div className={classes.changeUserName}>
            <label>
                Change User Nickname <input ref={changeNameInput}
                    onChange={onUserNameChange}
                    type="text" value={userName} />
            </label>
            <div className={classes.btn_confirmChanges}>
                <NavLink to={"/Profile"}>
                    <button onClick={changeUserName}>
                        Confirm
                    </button>
                </NavLink>
            </div>
        </div>
    )
}

export default ChangeUserName