import { connect } from 'react-redux';
import FriendsNav from './friendsNav';
import { withAuthRedirect } from '../../../../HOC/withAuthRedirect';

const FriendsNavContainer = withAuthRedirect(connect(null, null)(FriendsNav));

export default FriendsNavContainer;