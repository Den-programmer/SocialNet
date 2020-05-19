import { connect } from "react-redux";
import Login from "./login";
import { login } from '../../../BLL/reducer-auth';


let mapStateToProps = (state) => {
    return {}
}

const LoginContainer = connect(mapStateToProps, { login })(Login);

export default LoginContainer;