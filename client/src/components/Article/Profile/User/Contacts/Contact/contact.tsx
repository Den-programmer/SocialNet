import React from 'react'
import classes from './contact.module.scss'

interface IContact {
    contactTitle: string | null
    contactValue: string | undefined
}

const Contact: React.FC<IContact> = ({ contactTitle, contactValue }) => {
    let hasContact = contactTitle && contactValue
    return (<>
        {hasContact && <div className={classes.contact}>
            <h4 className={classes.contactTitle}>{contactTitle}: </h4>
            <a target="_blank" className={classes.userLink} href={contactValue}>{contactValue}</a>
        </div>}
    </>)
}

export default Contact