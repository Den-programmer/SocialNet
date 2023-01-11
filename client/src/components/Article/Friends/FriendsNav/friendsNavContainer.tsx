import { connect } from 'react-redux'
import FriendsNav from './friendsNav'
import { withAuthRedirect } from '../../../../HOC/withAuthRedirect'
import { compose } from 'redux'

export default compose<React.ComponentType>(
    connect(null, null),
    withAuthRedirect
)(FriendsNav)