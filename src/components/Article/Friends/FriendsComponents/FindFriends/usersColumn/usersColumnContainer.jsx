import { connect } from "react-redux";
import UsersColumn from "./usersColumn";

let mapStateToProps = (state) => {
    return {
        users: state.users.users,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {

    }
}

const UsersColumnContainer = connect(mapStateToProps, mapDispatchToProps)(UsersColumn); 

export default UsersColumnContainer;