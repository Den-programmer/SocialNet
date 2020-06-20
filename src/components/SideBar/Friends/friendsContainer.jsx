import { connect } from "react-redux";
import Friends from "./friends";
import { getFriends, getSideBarNavLinks } from "../../../BLL/selectors/selectors";

let mapStateToProps = (state) => {
    return {
        friends: getFriends(state),
        navLinks: getSideBarNavLinks(state)
    }
}

const FriendsContainer = connect(mapStateToProps, {  })(Friends);

export default FriendsContainer;