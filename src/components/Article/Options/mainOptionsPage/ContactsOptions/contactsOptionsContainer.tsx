import { connect } from 'react-redux'
import ContactsOptions from './contactsOptions'
import { RootState } from '../../../../../BLL/redux'
import { actions } from '../../../../../BLL/reducer-notifications'
import { saveProfile } from '../../../../../BLL/reducer-profile'
import { getUsersName, getContacts } from '../../../../../BLL/selectors/profile-selectors'
import { getMessageError } from '../../../../../BLL/selectors/selectors'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'

const mapStateToProps = (state:RootState) => ({
    userName: getUsersName(state),
    contacts: getContacts(state),
    error: getMessageError(state)
})

const { addNotification } = actions

const ContactsOptionsContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, { saveProfile, addNotification })
)(ContactsOptions)

export default ContactsOptionsContainer