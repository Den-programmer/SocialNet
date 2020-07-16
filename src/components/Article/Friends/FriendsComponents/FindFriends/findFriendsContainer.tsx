import { connect } from "react-redux"
import FindFriends from "./findFriends"
import { changePage } from '../../../../../BLL/reducer-friends'
import { withAuthRedirect } from "../../../../../HOC/withAuthRedirect"
import { compose } from 'redux'
import { getUsersInf } from "../../../../../BLL/selectors/users-selectors"
import { RootState } from "../../../../../BLL/redux"

const mapStateToProps = (state: RootState) => ({
    usersInf: getUsersInf(state)
})

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, { changePage })
)(FindFriends)