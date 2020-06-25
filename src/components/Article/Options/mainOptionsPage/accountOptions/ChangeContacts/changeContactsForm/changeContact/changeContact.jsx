import React from 'react';
import classes from './changeContact.module.css';
import { createField, Input } from '../../../../../../../common/Forms/forms';

const ChangeContact = ({title, val}) => {
    return (
        <div className={classes.contact}>
            <div className={classes.title}>
                <h4>{title}</h4>
            </div>
            <div className={classes.contactsForm}>
                {createField("text", '', title, Input, [], val)}
            </div>
        </div>
    );
}

export default ChangeContact;