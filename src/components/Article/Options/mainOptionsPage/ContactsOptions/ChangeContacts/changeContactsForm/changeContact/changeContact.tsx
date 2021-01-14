import React, { useState, ChangeEvent } from 'react'
import '../../../../../options.scss'
import { createReviewChangesBtn } from '../../../../../../../../utils/helpers/functions/function-helpers'
import { saveProfileType } from '../../../../../../../../BLL/reducer-profile'
import { ICurrentContact } from '../../../contactsOptions'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import { useEditIconStyles } from '../../../../accountOptions/accountOptions'

interface IChangeContact {
    id: number
    property: string
    value: string | null
    userName: string
    error: string
    currentPageUrl: string
    currentContacts: Array<ICurrentContact>
    saveProfile: (profile: saveProfileType) => void
    setCurrentContacts: (array: Array<ICurrentContact>) => void
    addNotification: (title: string | null, pageUrl: string | null, type: 'Profile' | 'Messages' | 'News' | 'Friends') => void
}

const ChangeContact: React.FC<IChangeContact> = (props) => {
    const classes = useEditIconStyles()
    let contactVal = props.value ? props.value : 'Not provided'
    const [currentContact, setCurrentContact] = useState<string>(contactVal)
    const saveChanges = () => {
        const contacts: any = {}
        for (let i = 0; i < props.currentContacts.length; i++) {
            let key: string = props.currentContacts[i].property
            if(props.id === i+1) {
                contacts[key] = currentContact
            } else {
                contacts[key] = props.currentContacts[i].value
            }
        }
        let profile = {
            fullName: props.userName,
            contacts: contacts
        }
        let array = props.currentContacts.map((item: ICurrentContact) => {
            if (item.id === props.id) return { ...item, value: currentContact }
            return { ...item, isEdit: false }
        })
        props.setCurrentContacts(array)
        props.saveProfile(profile)
        props.addNotification('Your contacts have been changed successfully!', '/Profile', 'Profile')
    }
    const onContactChange = (e: ChangeEvent<HTMLInputElement>) => setCurrentContact(e.currentTarget.value)
    return (
        <div className="editContentItem">
            <div className="editContentItem_main">
                <h5 className="editContentItem_property">{props.property}</h5>
                <div className="editContentItem_editInput">
                    <input className={props.error ? "options_errorInput" : ""} type="text" onChange={onContactChange} value={currentContact} />
                </div>
            </div>
            {createReviewChangesBtn(saveChanges, '/Profile', props.error, props.currentPageUrl)}
            {/* {props.error !== '' && <div className="options_error">
                <ErrorOutlineIcon className={classes.errorIcon}/>
            </div>} */}
        </div>
    )
}

export default ChangeContact