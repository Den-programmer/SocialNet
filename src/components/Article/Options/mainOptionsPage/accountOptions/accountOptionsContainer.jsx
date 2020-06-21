import { connect } from 'react-redux';
import AccountOptions from './accountOptions';
import { setUserPhotoThunk, changeUserName, changeContacts } from '../../../../../BLL/reducer-profile';
import { getUsersSmallPhoto, getUsersName, getContacts, getMessageError } from '../../../../../BLL/selectors/selectors';

let mapStateToProps = (state) => {
    return {
        photo: getUsersSmallPhoto(state),
        userName: getUsersName(state),
        contacts: getContacts(state),
        messageError: getMessageError(state)
    }
}

const AccountOptionsContainer = connect(mapStateToProps, { setUserPhotoThunk, changeUserName, changeContacts })(AccountOptions);

export default AccountOptionsContainer;