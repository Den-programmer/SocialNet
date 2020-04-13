import { connect } from "react-redux";
import UsersColumn from "./usersColumn";
import { followAC, unfollowAC, setUsersAC } from "../../../../../../BLL/reducer-friends";

let mapStateToProps = (state) => {
    return {
        users: state.Friends.users,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(followAC(userId));
        },
        unfollow: (userId) => {
            dispatch(unfollowAC(userId));
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users));
        },
    }
}

const UsersColumnContainer = connect(mapStateToProps, mapDispatchToProps)(UsersColumn); 

export default UsersColumnContainer;