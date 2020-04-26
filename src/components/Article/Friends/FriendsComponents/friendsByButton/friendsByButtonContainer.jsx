import FriendsByButton from './friendsByButton';
import { connect } from 'react-redux';
import { follow, unfollow } from '../../../../../BLL/reducer-friends';

let mapStateToProps = (state) => {
    return {
        friends: state.Friends.friends,
    }
};


const FriendsByButtonContainer = connect(mapStateToProps, { follow: follow, unfollow: unfollow })(FriendsByButton);

export default FriendsByButtonContainer;