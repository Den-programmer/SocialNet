import { connect } from "react-redux"
import Friends from "./friends"
import { getFriends } from "../../../BLL/selectors/users-selectors"
import { getSideBarNavLinks } from "../../../BLL/selectors/sidebar-selectors"
import { RootState } from "../../../BLL/redux"

let mapStateToProps = (state: RootState) => ({
    friends: getFriends(state),
    navLinks: getSideBarNavLinks(state)
})

const FriendsContainer = connect(mapStateToProps, {  })(Friends)

export default FriendsContainer