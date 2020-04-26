import { connect } from "react-redux";
import { followAC, unfollowAC, setUsersAC, setUsersInfAC, isFetchingAC } from "../../../../../../BLL/reducer-friends";
import UsersColumnAPI from "./usersColumnAPI";

let mapStateToProps = (state) => {
    return {
        users: state.Friends.users,
        usersInf: state.Friends.usersInf,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        follow: userId => {
            dispatch(followAC(userId));
        },
        unfollow: userId => {
            dispatch(unfollowAC(userId));
        },
        setUsers: users => {
            dispatch(setUsersAC(users));
        },
        setUsersInf:data => {
            dispatch(setUsersInfAC(data));
        },
        isFetching:isFetching => {
            dispatch(isFetchingAC(isFetching));
        }
    }
}

const UsersColumnContainer = connect(mapStateToProps, mapDispatchToProps)(UsersColumnAPI); 

export default UsersColumnContainer;