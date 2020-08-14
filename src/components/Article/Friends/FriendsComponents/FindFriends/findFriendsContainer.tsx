import { connect } from "react-redux"
import FindFriends from "./findFriends"
import { actions } from '../../../../../BLL/reducer-friends'
import { withAuthRedirect } from "../../../../../HOC/withAuthRedirect"
import { compose } from 'redux'
import { getUsersInf } from "../../../../../BLL/selectors/users-selectors"
import { RootState } from "../../../../../BLL/redux"

const mapStateToProps = (state: RootState) => ({
    usersInf: getUsersInf(state)
})

const { changePage } = actions

export default compose<React.ComponentType>(
    connect(mapStateToProps, { changePage }),
    withAuthRedirect
)(FindFriends)