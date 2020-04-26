import { connect } from "react-redux";
import FindFriends from "./findFriends";
import {onPageChangeAC} from './../../../../../BLL/reducer-friends';

let mapStateToProps = state => {
    return {
        usersInf: state.Friends.usersInf,
    }
}
let mapDispatchtoProps = (dispatch) => {
    return {
        changePage:(currentPage) => {
            dispatch(onPageChangeAC(currentPage));
        },
    }
}

const FindFriendsContainer = connect(mapStateToProps, mapDispatchtoProps)(FindFriends);

export default FindFriendsContainer;