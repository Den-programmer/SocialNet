import React from 'react'
import classes from './loginForm.module.css'
import { reduxForm, InjectedFormProps } from 'redux-form'
import { createField, Input, RememberMe, PasswordInputValidate, EmailInputValidate } from '../../../common/Forms/forms'
import { RegisterFormDataType } from '../../Login/login'
import { maxLengthCreator, required, minLengthCreator } from '../../../../utils/validators/validators'
import LoginImg from './LoginImg/loginImg'

interface LoginFormPropType {
    captcha: string | null
    isRegister: boolean
    setIsRegisterStatus: (status: boolean) => void
}

const maxLengthLogin = maxLengthCreator(90)
const maxLengthPassword = maxLengthCreator(90)
const minLengthPassword = minLengthCreator(7)
const maxLengthUsername = maxLengthCreator(20)

const LoginForm: React.FC<InjectedFormProps<RegisterFormDataType, LoginFormPropType> & LoginFormPropType> = (props) => {
    return (
        <div className={classes.formWrapper}>
            <LoginImg />
            <form onSubmit={props.handleSubmit}>
                <div className={classes.formTitle}>
                    <h3>{props.isRegister ? 'Register' : 'Login'}</h3>
                </div>
                <div className={classes.formItem}>
                    {createField("text", 'Email', "email", EmailInputValidate, [maxLengthLogin, required])}
                </div>
                {props.isRegister && <div className={classes.formItem}>
                    {createField("text", 'User name', "username", Input, [required, maxLengthUsername])}
                </div>}
                <div className={classes.formItem}>
                    {createField("password", 'Password', "password", PasswordInputValidate, [required, minLengthPassword, maxLengthPassword])}
                </div>
                <div className={classes.confirmation}>
                    <div className={classes.rememberMe}>
                        {createField("checkbox", '', "RememberMe", RememberMe, [])}
                    </div>

                    {/* {props.captcha && <img className={classes.captcha} src={props.captcha} alt="captcha" />}
                    {props.captcha && <div className={classes.captchaInput}>{createField("text", "", "captcha", Input, [required])}</div>} */}

                    {props.error && <div className={classes.error}>
                        <p>{props.error}</p>
                    </div>}
                    <div className={classes.btn_login}>
                        <button>{props.isRegister ? 'Register' : 'Login'}</button>
                    </div>
                    <div className={classes.isCurrentFormContainer}>
                        {props.isRegister ? <span onClick={() => props.setIsRegisterStatus(false)} className={classes.isCurrentForm}>Already have an account? Try to login!</span> :
                            <span onClick={() => props.setIsRegisterStatus(true)} className={classes.isCurrentForm}>Don't have an account? Try to register!</span>}
                    </div>
                </div>
            </form>
        </div>
    )
}
const ReduxLoginForm = reduxForm<RegisterFormDataType, LoginFormPropType>({ form: 'login' })(LoginForm)

export default ReduxLoginForm