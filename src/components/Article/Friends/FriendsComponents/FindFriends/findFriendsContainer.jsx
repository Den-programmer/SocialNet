import { connect } from "react-redux";
import FindFriends from "./findFriends";
import { onPageChange } from './../../../../../BLL/reducer-friends';
import { withAuthRedirect } from "../../../../../HOC/withAuthRedirect";
import { compose } from 'redux';

let mapStateToProps = state => {
    return {
        usersInf: state.Friends.usersInf,
    }
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, { changePage: onPageChange })
)(FindFriends);