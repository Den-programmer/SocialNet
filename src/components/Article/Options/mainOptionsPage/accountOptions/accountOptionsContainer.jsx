import { connect } from 'react-redux';
import AccountOptions from './accountOptions';
import { setUserPhotoThunk } from '../../../../../BLL/reducer-profile';

let mapStateToProps = (state) => {
    return {
        photo: state.profilePage.profile.photos.small
    }
}

const AccountOptionsContainer = connect(mapStateToProps, { setUserPhotoThunk })(AccountOptions);

export default AccountOptionsContainer;