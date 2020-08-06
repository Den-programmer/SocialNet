import { connect } from "react-redux"
import Login from "./login"
import { login } from '../../../BLL/reducer-auth'
import { getSecurityCaptcha } from "../../../BLL/selectors/security-selectors"
import { RootState } from "../../../BLL/redux"
import { compose } from "redux"
import { withRouter } from "react-router-dom"
import { getIsAuthStatus } from "../../../BLL/selectors/auth-selectors"


let mapStateToProps = (state: RootState) => ({
    captcha: getSecurityCaptcha(state),
    isAuth: getIsAuthStatus(state)
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, { login }),
    withRouter
)(Login)