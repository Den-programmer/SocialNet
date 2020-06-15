import React from 'react';
import classes from './changeContact.module.css';
import { Input, createField } from '../../../../../../../common/Forms/forms';

const ChangeContact = ({title, val}) => {
    return (
        <div className={classes.contact}>
            <h4>{title}</h4>
            <div className={classes.dFlex}>
                {createField("text", null, title, Input, [], val)}
                <div className={classes.btn_confirm}>
                    <button>Confirm</button>
                </div>
            </div>
        </div>
    );
}

export default ChangeContact;