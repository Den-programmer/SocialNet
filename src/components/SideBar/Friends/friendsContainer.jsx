import { connect } from "react-redux";
import Friends from "./friends";
import { getFriends } from "../../../BLL/selectors/selectors";

let mapStateToProps = (state) => {
    return {
        friends: getFriends(state),
    }
}

const FriendsContainer = connect(mapStateToProps, null)(Friends);

export default FriendsContainer;