import { connect } from 'react-redux';
import AccountOptions from './accountOptions';
import { setUserPhotoThunk, changeUserName } from '../../../../../BLL/reducer-profile';
import { getUsersSmallPhoto, getUsersName, getContacts } from '../../../../../BLL/selectors/selectors';

let mapStateToProps = (state) => {
    return {
        photo: getUsersSmallPhoto(state),
        userName: getUsersName(state),
        contacts: getContacts(state)
    }
}

const AccountOptionsContainer = connect(mapStateToProps, { setUserPhotoThunk, changeUserName })(AccountOptions);

export default AccountOptionsContainer;