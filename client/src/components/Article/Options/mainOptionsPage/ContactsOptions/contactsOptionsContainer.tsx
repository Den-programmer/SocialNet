import { connect } from 'react-redux'
import ContactsOptions from './contactsOptions'
import { RootState } from '../../../../../BLL/redux'
import { updateContacts } from '../../../../../BLL/reducer-profile'
import { getUsersName, getContacts } from '../../../../../BLL/selectors/profile-selectors'
import { getMessageError } from '../../../../../BLL/selectors/selectors'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { createNotification } from '../../../../../BLL/reducer-notifications'

const mapStateToProps = (state:RootState) => ({
    userName: getUsersName(state),
    contacts: getContacts(state),
    error: getMessageError(state)
})


const ContactsOptionsContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, { updateContacts, createNotification })
)(ContactsOptions)

export default ContactsOptionsContainer