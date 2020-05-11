import FriendsByButton from './friendsByButton';
import { connect } from 'react-redux';
import { follow, unfollow } from '../../../../../BLL/reducer-friends';
import { withAuthRedirect } from '../../../../../HOC/withAuthRedirect';

let mapStateToProps = (state) => {
    return {
        friends: state.Friends.friends,
    }
};

const FriendsByButtonContainer = withAuthRedirect(connect(mapStateToProps, { follow: follow, unfollow: unfollow })(FriendsByButton));

export default FriendsByButtonContainer;