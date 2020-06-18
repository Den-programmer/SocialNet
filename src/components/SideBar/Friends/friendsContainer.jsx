import { connect } from "react-redux";
import Friends from "./friends";
import { getFriends } from "../../../BLL/selectors/selectors";
import { addSideBarNavLink, deleteSideBarNavLink } from '../../../BLL/reducer-sidebar';

let mapStateToProps = (state) => {
    return {
        friends: getFriends(state),
    }
}

const FriendsContainer = connect(mapStateToProps, { addSideBarNavLink, deleteSideBarNavLink })(Friends);

export default FriendsContainer;