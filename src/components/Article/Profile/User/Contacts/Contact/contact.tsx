import React from 'react'
import classes from './contact.module.css'

interface IContact {
    contactTitle: string | null
    contactValue: string | null
}

const Contact: React.FC<IContact> = ({ contactTitle, contactValue }) => {
    let hasContact = contactTitle && contactValue
    return (
        <div className={classes.contact}>
            {hasContact && <><h4 className={classes.contactTitle}>{contactTitle + ':'}</h4>
            {/* Changed attribute href in node_modules! */}
            <a target="_blank" className={classes.userLink} href={contactValue}>{contactValue}</a></>}
        </div>
    )
}

export default Contact