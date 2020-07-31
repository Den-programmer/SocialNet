import React from 'react'
import classes from './changeContactsForm.module.css'
import ChangeContact from './changeContact/changeContact'
import { reduxForm, InjectedFormProps } from 'redux-form'
import { contactsType } from '../../../../../../../BLL/reducer-profile'
import Btn_Confirm from '../../../../../../common/Btns/Btn_confirm/btn_confirm'

interface IProps {
    contacts: contactsType
}

const ChangeContactsForm:React.FC<InjectedFormProps<contactsType, IProps> & IProps> = (props) => {
    const contactsKeys: string[] = []
    const contacts = Object.keys(props.contacts).map((key) => {
        contactsKeys.push(key)
        return <ChangeContact key={key} title={key}/>
    })
    return (
        <form onSubmit={props.handleSubmit} className={classes.contactsForm}>
            <div className={classes.contacts}>
                {contacts}
            </div>
            {props.anyTouched && <div className={classes.btn_confirm}>
                <Btn_Confirm clickFunction={() => props.untouch(...contactsKeys)}/>
            </div>}
            {props.error && <div className={classes.error}>{props.error}</div>}
        </form>
    )
}
const ChangeContactsReduxForm = reduxForm<contactsType, IProps>({
    form: 'ChangeContacts',
    touchOnChange: true,
    touchOnBlur: false
})(ChangeContactsForm)

export default ChangeContactsReduxForm