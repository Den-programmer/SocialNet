import FriendsByButton from './friendsByButton';
import { connect } from 'react-redux';
import { followAC, unfollowAC } from '../../../../../BLL/reducer-friends';

let mapStateToProps = (state) => {
    return {
        friends: state.Friends.friends,
    }
};
let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(followAC(userId));
        },
        unfollow: (userId) => {
            dispatch(unfollowAC(userId));
        },
        // setFriends: (friends) => {
        //     dispatch(setFriendsAC(friends));
        // },
    }
};

const FriendsByButtonContainer = connect(mapStateToProps, mapDispatchToProps)(FriendsByButton);

export default FriendsByButtonContainer;