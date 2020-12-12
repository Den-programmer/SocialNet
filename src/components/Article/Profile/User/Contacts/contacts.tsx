import React from 'react'
import classes from './contacts.module.scss'
import Contact from './Contact/contact'
import { contactsType } from '../../../../../BLL/reducer-profile'
import { Container } from '@material-ui/core'

interface IContacts {
    contacts: contactsType
}

const Contacts: React.FC<IContacts> = (props) => {
    const contacts = Object.keys(props.contacts).map(key => {
        // @ts-ignore
        return <Contact key={key} contactTitle={key} contactValue={props.contacts[key as keyof contactsType]} />
    })
    return (
        <Container>
            <div className={classes.userInf}>
                <div className={classes.contacts}>
                    <div className={classes.title}>
                        <h2>{Object.keys(props.contacts).every(item => props.contacts[item as keyof contactsType] === '' || !props.contacts[item as keyof contactsType]) ? "" : 'Contacts'}</h2>
                    </div>
                    <div className={classes.information}>
                        {contacts}
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Contacts