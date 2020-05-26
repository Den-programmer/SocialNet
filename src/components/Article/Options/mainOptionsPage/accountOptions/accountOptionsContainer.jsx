import { connect } from 'react-redux';
import AccountOptions from './accountOptions';
import { setUserPhotoThunk } from '../../../../../BLL/reducer-profile';
import { getUsersSmallPhoto } from '../../../../../BLL/selectors/selectors';

let mapStateToProps = (state) => {
    return {
        photo: getUsersSmallPhoto(state),
    }
}

const AccountOptionsContainer = connect(mapStateToProps, { setUserPhotoThunk })(AccountOptions);

export default AccountOptionsContainer;