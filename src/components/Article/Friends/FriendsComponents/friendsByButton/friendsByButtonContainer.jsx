import FriendsByButton from './friendsByButton';
import { connect } from 'react-redux';
import { followThunk, unfollowThunk } from '../../../../../BLL/reducer-friends';
import { withAuthRedirect } from '../../../../../HOC/withAuthRedirect';
import { compose } from 'redux';
import { getFriends } from '../../../../../BLL/selectors/selectors';

let mapStateToProps = (state) => {
    return {
        friends: getFriends(state),
    }
};

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, { followThunk, unfollowThunk }),
)(FriendsByButton);