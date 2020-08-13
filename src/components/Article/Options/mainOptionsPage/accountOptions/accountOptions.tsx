import React from 'react'
import classes from './accountOptions.module.css'
import EditPhoto from './editPhoto/editPhoto'
import ChangeUserName from './ChangeUserName/changeUserName'
import ChangeContacts from './ChangeContacts/changeContacts'
import { contactsType, saveProfileType } from '../../../../../BLL/reducer-profile'
 
interface AccountOptionsPropsType {
    messageError: string | null
    photo: any | null
    userName: string
    contacts: contactsType
    setUserPhotoThunk: (photo: File) => void
    changeUserName: (userName: string) => void
    saveProfile: (profile: saveProfileType) => void
}

const AccountOptions:React.FC<AccountOptionsPropsType> = (props) => {
    return (
        <div className={classes.accountOptions}>
            <EditPhoto error={props.messageError} setUserPhoto={props.setUserPhotoThunk} photo={props.photo}/>
            <ChangeUserName contacts={props.contacts} saveProfile={props.saveProfile} userName={props.userName} changeUserName={props.changeUserName}/>
            <ChangeContacts userName={props.userName} saveProfile={props.saveProfile} contacts={props.contacts}/>
        </div>
    )
}

export default AccountOptions