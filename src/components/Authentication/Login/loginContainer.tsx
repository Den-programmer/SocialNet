import { connect } from "react-redux";
import Login from "./login";
import { login } from '../../../BLL/reducer-auth';
import { getSecurityCaptcha } from "../../../BLL/selectors/security-selectors";
import { RootState } from "../../../BLL/redux";


let mapStateToProps = (state: RootState) => ({
    captcha: getSecurityCaptcha(state)
});

const LoginContainer = connect(mapStateToProps, { login })(Login);

export default LoginContainer;