import { connect } from "react-redux";
import FindFriends from "./findFriends";
import { onPageChange } from './../../../../../BLL/reducer-friends';
import { withAuthRedirect } from "../../../../../HOC/withAuthRedirect";
import { compose } from 'redux';
import { getUsersInf } from "../../../../../BLL/selectors/selectors";

let mapStateToProps = state => {
    return {
        usersInf: getUsersInf(state),
    }
}

export default compose(
    // withAuthRedirect,
    connect(mapStateToProps, { changePage: onPageChange })
)(FindFriends);