import React from 'react'
import classes from './login.module.css'
import ReduxLoginForm from './LoginForm/loginForm'

interface LoginPropType {
    captcha: string | null
    login: (email: string | null, password: string | null, rememberMe: boolean, captcha: string | null) => void
}

export interface LoginFormDataType {
    email: string | null
    password: string | null
    RememberMe: boolean
    captcha: string | null
}

const Login:React.FC<LoginPropType> = (props) => {
    let onSubmit = (FormData:LoginFormDataType):void => {
        let { email, password, RememberMe, captcha } = FormData
        props.login(email, password, RememberMe, captcha)
    }
    return (
        <div className={classes.login}>
            <div className={classes.title}>
                <h3>Login</h3>
            </div>
            <ReduxLoginForm captcha={props.captcha} onSubmit={onSubmit}/>
        </div>
    )
}

export default Login