import { connect } from "react-redux";
import Friends from "./friends";
import { getFriends, getSideBarNavLinks } from "../../../BLL/selectors/selectors";
import { RootState } from "../../../BLL/redux";

let mapStateToProps = (state: RootState) => {
    return {
        friends: getFriends(state),
        navLinks: getSideBarNavLinks(state)
    }
}

const FriendsContainer = connect(mapStateToProps, {  })(Friends);

export default FriendsContainer;