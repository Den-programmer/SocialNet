import React, { useState } from 'react'
import '../../options.scss'
import OptionsTitle from '../accountOptions/OptionsTitle/optionsTitle'
import { contactsType, saveProfileType } from '../../../../../BLL/reducer-profile'
import { useEditIconStyles } from '../accountOptions/accountOptions'
import EditIcon from '@material-ui/icons/Edit'
import ChangeContact from './ChangeContacts/changeContactsForm/changeContact/changeContact'
import { RouteComponentProps } from 'react-router-dom'

interface IContactsOptions {
    userName: string
    contacts: contactsType
    error: string 
    saveProfile: (profile: saveProfileType) => void
}

export interface ICurrentContact {
    id: number
    property: string
    value: string | null
    isEdit: boolean
    isEditIconActive: boolean
}

const ContactsOptions: React.FC<IContactsOptions & RouteComponentProps> = (props) => {
    const classes = useEditIconStyles()
    const contacts = Object.keys(props.contacts).map((key, index: number) => {
        let currentIndex = index + 1
        return {
            id: currentIndex,
            property: key,
            value: props.contacts[key as keyof contactsType],
            isEdit: false,
            isEditIconActive: false
        }
    })
    const [currentContacts, setCurrentContacts] = useState<Array<ICurrentContact>>(contacts)
    const menuItems = currentContacts.map((item: ICurrentContact) => {
        const handleHover = (itemId: number, status: boolean) => {
            let array = currentContacts.map((item: ICurrentContact) => {
                if (itemId === item.id && status === true) return { ...item, isEditIconActive: true }
                return { ...item, isEditIconActive: false }
            })
            setCurrentContacts(array)
        }
        const handleClick = (itemId: number) => {
            let array = currentContacts.map((item: ICurrentContact) => {
                if (itemId === item.id) return { ...item, isEdit: true }
                return { ...item, isEdit: false }
            })
            setCurrentContacts(array)
        }
        return (
            <div key={item.id} onClick={() => handleClick(item.id)} onMouseEnter={() => handleHover(item.id, true)} onMouseLeave={() => handleHover(item.id, false)} className="options_itemWrapper">
                <div className="options_item">
                    {item.isEdit ? <ChangeContact error={props.error} currentPageUrl={props.location.pathname} key={item.id} id={item.id} 
                    property={item.property} userName={props.userName} currentContacts={currentContacts} setCurrentContacts={setCurrentContacts} value={item.value} saveProfile={props.saveProfile}/> : <div className="options_item_content">
                        <h5 className="options_item_content_property">{item.property}</h5>
                        <p className="options_item_content_value">{item.value ? item.value : 'Not provided'}</p>
                    </div>}
                    {item.isEditIconActive && <EditIcon className={classes.editIcon} />}
                </div>
            </div>
        )
    })
    return (
        <div className="options">
            <OptionsTitle title="Contacts Options" />
            <div>{menuItems}</div>
        </div>
    )
}


export default ContactsOptions