import { connect } from "react-redux";
import Friends from "./friends";

let mapStateToProps = (state) => {
    return {
        Friends:state.Friends,
    }
}

const FriendsContainer = connect(mapStateToProps, null)(Friends);

export default FriendsContainer;