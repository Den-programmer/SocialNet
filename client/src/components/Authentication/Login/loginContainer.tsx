import { connect } from "react-redux"
import Login from "./login"
import { login, actions, register } from '../../../BLL/reducer-auth'
import { getSecurityCaptcha } from "../../../BLL/selectors/security-selectors"
import { RootState } from "../../../BLL/redux"
import { compose } from "redux"
import { withRouter } from "react-router-dom"
import { getIsAuthStatus, getIsRegisterStatus } from "../../../BLL/selectors/auth-selectors"

const mapStateToProps = (state: RootState) => ({
    captcha: getSecurityCaptcha(state),
    isAuth: getIsAuthStatus(state),
    isRegister: getIsRegisterStatus(state)
})

const { setIsRegisterStatus } = actions

export default compose<React.ComponentType>(
    connect(mapStateToProps, { login, setIsRegisterStatus, register }),
    withRouter
)(Login)