import { connect } from "react-redux";
import Login from "./login";
import { login } from '../../../BLL/reducer-auth';
import { getSecurityCaptcha } from "../../../BLL/selectors/selectors";


let mapStateToProps = (state) => {
    return {
        captcha: getSecurityCaptcha(state)
    }
}

const LoginContainer = connect(mapStateToProps, { login })(Login);

export default LoginContainer;