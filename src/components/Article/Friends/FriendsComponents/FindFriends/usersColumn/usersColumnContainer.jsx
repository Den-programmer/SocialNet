import { connect } from "react-redux";
import UsersColumn from "./usersColumn";
import { followAC, unfollowAC } from "../../../../../../BLL/reducer-users";

let mapStateToProps = (state) => {
    return {
        users: state.Friends.users,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId, name, nickname, avatar) => {
            dispatch(followAC(userId, name, nickname, avatar));
        },
        unfollow: (userId) => {
            dispatch(unfollowAC(userId));
        },
    }
}

const UsersColumnContainer = connect(mapStateToProps, mapDispatchToProps)(UsersColumn); 

export default UsersColumnContainer;