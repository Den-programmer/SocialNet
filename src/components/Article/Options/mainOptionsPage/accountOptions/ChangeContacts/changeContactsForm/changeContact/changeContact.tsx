import React from 'react'
import classes from './changeContact.module.css'
import { createField, Input } from '../../../../../../../common/Forms/forms'

interface IChangeContact {
    title: string
}

const ChangeContact: React.FC<IChangeContact> = ({title}) => {
    return (
        <div className={classes.contact}>
            <div className={classes.title}>
                <h4>{title}</h4>
            </div>
            <div className={classes.contactsForm}>
                {createField("text", '', title, Input, [])}
            </div>
        </div>
    )
}

export default ChangeContact