import { connect } from "react-redux";
import FindFriends from "./findFriends";
import { onPageChange } from './../../../../../BLL/reducer-friends';

let mapStateToProps = state => {
    return {
        usersInf: state.Friends.usersInf,
    }
}

const FindFriendsContainer = connect(mapStateToProps, { changePage: onPageChange })(FindFriends);


export default FindFriendsContainer;