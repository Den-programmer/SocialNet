import React from 'react'
import classes from './loginForm.module.css'
import { reduxForm, InjectedFormProps } from 'redux-form'
import { createField, Input, RememberMe, PasswordInputValidate, EmailInputValidate } from '../../../common/Forms/forms'
import { LoginFormDataType } from '../../Login/login'
import { maxLengthCreator, required, minLengthCreator } from '../../../../utils/validators/validators'
import LoginImg from './LoginImg/loginImg'

interface LoginFormPropType {
    captcha: string | null
}

const maxLengthLogin = maxLengthCreator(90)
const maxLengthPassword = maxLengthCreator(90)
const minLengthPassword = minLengthCreator(7)

const LoginForm: React.FC<InjectedFormProps<LoginFormDataType, LoginFormPropType> & LoginFormPropType> = (props) => {
    return (
        <div className={classes.formWrapper}>
            <LoginImg />
            <form onSubmit={props.handleSubmit}>
                <div className={classes.formTitle}>
                    <h3>Login</h3>
                </div>
                <div className={classes.formItem}>
                    {createField("text", 'Email', "email", EmailInputValidate, [maxLengthLogin, required])}
                </div>
                <div className={classes.formItem}>
                    {createField("password", 'Password', "password", PasswordInputValidate, [required, minLengthPassword, maxLengthPassword])}
                </div>
                <div className={classes.confirmation}>
                    <div className={classes.rememberMe}>
                        {createField("checkbox", '', "RememberMe", RememberMe, [])}
                    </div>

                    {props.captcha && <img className={classes.captcha} src={props.captcha} alt="captcha" />}
                    {props.captcha && <div className={classes.captchaInput}>{createField("text", "", "captcha", Input, [required])}</div>}

                    {props.error && <div className={classes.error}>
                        <p>{props.error}</p>
                    </div>}
                    <div className={classes.btn_login}>
                        <button>Login</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
const ReduxLoginForm = reduxForm<LoginFormDataType, LoginFormPropType>({ form: 'login' })(LoginForm)

export default ReduxLoginForm