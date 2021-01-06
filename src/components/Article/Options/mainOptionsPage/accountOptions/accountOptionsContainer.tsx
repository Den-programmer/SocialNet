import { connect } from 'react-redux'
import AccountOptions from './accountOptions'
import { setUserPhotoThunk, saveProfile, actions, saveAboutMe } from '../../../../../BLL/reducer-profile'
import { getMessageError } from '../../../../../BLL/selectors/selectors'
import { getUsersSmallPhoto, getUsersName, getContacts, getGender, getBiography } from '../../../../../BLL/selectors/profile-selectors'
import { RootState } from '../../../../../BLL/redux'

const mapStateToProps = (state: RootState) => ({
    photo: getUsersSmallPhoto(state),
    userName: getUsersName(state),
    contacts: getContacts(state),
    messageError: getMessageError(state),
    gender: getGender(state),
    aboutMe: getBiography(state)
})

const { changeUserName, changeContacts, changeGender } = actions

const AccountOptionsContainer = connect(mapStateToProps, { setUserPhotoThunk, changeUserName, changeContacts, saveProfile, changeGender, saveAboutMe })(AccountOptions)

export default AccountOptionsContainer