import { connect } from "react-redux";
import FindFriends from "./findFriends";
import { onPageChange } from './../../../../../BLL/reducer-friends';
import { withAuthRedirect } from "../../../../../HOC/withAuthRedirect";

let mapStateToProps = state => {
    return {
        usersInf: state.Friends.usersInf,
    }
}

const FindFriendsContainer = withAuthRedirect(connect(mapStateToProps, { changePage: onPageChange })(FindFriends));


export default FindFriendsContainer;