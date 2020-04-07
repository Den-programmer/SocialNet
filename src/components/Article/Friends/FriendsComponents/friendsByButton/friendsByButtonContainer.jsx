import FriendsByButton from './friendsByButton';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
    return {
        friends: state.Friends.friends,
    }
};
let mapDispatchToProps = (dispatch) => {
    return {

    }
};

const FriendsByButtonContainer = connect(mapStateToProps, mapDispatchToProps)(FriendsByButton);

export default FriendsByButtonContainer;