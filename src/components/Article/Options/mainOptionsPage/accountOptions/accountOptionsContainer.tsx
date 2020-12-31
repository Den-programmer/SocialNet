import { connect } from 'react-redux'
import AccountOptions from './accountOptions'
import { setUserPhotoThunk, saveProfile, actions } from '../../../../../BLL/reducer-profile'
import { getMessageError } from '../../../../../BLL/selectors/selectors'
import { getUsersSmallPhoto, getUsersName, getContacts, getGender } from '../../../../../BLL/selectors/profile-selectors'
import { RootState } from '../../../../../BLL/redux'

const mapStateToProps = (state: RootState) => ({
    photo: getUsersSmallPhoto(state),
    userName: getUsersName(state),
    contacts: getContacts(state),
    messageError: getMessageError(state),
    gender: getGender(state)
})

const { changeUserName, changeContacts, changeGender } = actions

const AccountOptionsContainer = connect(mapStateToProps, { setUserPhotoThunk, changeUserName, changeContacts, saveProfile, changeGender })(AccountOptions)

export default AccountOptionsContainer