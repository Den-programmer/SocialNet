import { connect } from "react-redux";
import { follow, unfollow, setUsers, setUsersInf, isFetching } from "../../../../../../BLL/reducer-friends";
import UsersColumnAPI from "./usersColumnAPI";

let mapStateToProps = (state) => {
    return {
        users: state.Friends.users,
        usersInf: state.Friends.usersInf,
    }
}

const UsersColumnContainer = connect(mapStateToProps, {
    follow: follow,
    unfollow: unfollow,
    setUsers: setUsers,
    setUsersInf: setUsersInf,
    isFetching:isFetching
})(UsersColumnAPI); 

export default UsersColumnContainer;