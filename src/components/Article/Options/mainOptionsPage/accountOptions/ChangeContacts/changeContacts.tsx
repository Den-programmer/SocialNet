import React from 'react'
import classes from './changeContacts.module.css'
import ChangeContactsForm from './changeContactsForm/changeContactsForm'
import { saveProfileType, contactsType } from '../../../../../../BLL/reducer-profile'

interface IProps {
    saveProfile: (profile: saveProfileType) => void
    userName: string
    contacts: contactsType
}

const ChangeContacts: React.FC<IProps> = (props) => {
    let onSubmit = (formData: contactsType) => {
        let profile = {
            fullName: props.userName,
            contacts: formData
        }   
        props.saveProfile(profile)
    } 
    return (
        <div className={classes.changeContacts}>
            <div className={classes.title}>
                <h4>Change contacts:</h4>
            </div>
            <ChangeContactsForm initialValues={props.contacts} {...props} onSubmit={onSubmit}/>
        </div>
    )
}

export default ChangeContacts