import { connect } from 'react-redux'
import AccountOptions from './accountOptions'
import { setUserPhotoThunk, changeUserName, changeContacts, saveProfile } from '../../../../../BLL/reducer-profile'
import { getMessageError } from '../../../../../BLL/selectors/selectors'
import { getUsersSmallPhoto, getUsersName, getContacts } from '../../../../../BLL/selectors/profile-selectors'
import { RootState } from '../../../../../BLL/redux'

let mapStateToProps = (state: RootState) => ({
    photo: getUsersSmallPhoto(state),
    userName: getUsersName(state),
    contacts: getContacts(state),
    messageError: getMessageError(state)
})

const AccountOptionsContainer = connect(mapStateToProps, { setUserPhotoThunk, changeUserName, changeContacts, saveProfile })(AccountOptions)

export default AccountOptionsContainer