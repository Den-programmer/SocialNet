import { connect } from "react-redux";
import UsersColumn from "./usersColumn";
import { followAC, unfollowAC } from "../../../../../../BLL/reducer-users";

let mapStateToProps = (state) => {
    return {
        users: state.users.users,
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
    }
}

const UsersColumnContainer = connect(mapStateToProps, mapDispatchToProps)(UsersColumn); 

export default UsersColumnContainer;