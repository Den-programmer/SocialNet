import { connect } from 'react-redux';
import FriendsNav from './friendsNav';

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
    }
}

const FriendsNavContainer = connect(mapStateToProps, null)(FriendsNav);

export default FriendsNavContainer;