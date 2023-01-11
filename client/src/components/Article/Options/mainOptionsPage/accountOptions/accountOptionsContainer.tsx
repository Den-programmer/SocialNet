import { connect } from 'react-redux'
import AccountOptions from './accountOptions'
import { setUserPhotoThunk, saveProfile, actions, saveAboutMe } from '../../../../../BLL/reducer-profile'
import { getMessageError } from '../../../../../BLL/selectors/selectors'
import { getUsersSmallPhoto, getUsersName, getContacts, getGender, getBiography, getIsMembersColumnOpenedStatus } from '../../../../../BLL/selectors/profile-selectors'
import { RootState } from '../../../../../BLL/redux'
import { actions as actions2 } from '../../../../../BLL/reducer-notifications'

const mapStateToProps = (state: RootState) => ({
    photo: getUsersSmallPhoto(state),
    userName: getUsersName(state),
    contacts: getContacts(state),
    messageError: getMessageError(state),
    gender: getGender(state),
    aboutMe: getBiography(state),
    isMembersColumnOpen: getIsMembersColumnOpenedStatus(state)
})

const { changeUserName, changeContacts, changeGender, changeMembersColumnOpenedStatus } = actions
const { addNotification } = actions2 

const AccountOptionsContainer = connect(mapStateToProps, { 
    addNotification, 
    setUserPhotoThunk, 
    changeUserName, 
    changeContacts, 
    saveProfile, 
    changeGender, 
    saveAboutMe, 
    changeMembersColumnOpenedStatus 
})(AccountOptions)

export default AccountOptionsContainer