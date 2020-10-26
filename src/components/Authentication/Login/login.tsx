import React from 'react'
import classes from './login.module.css'
import ReduxLoginForm from './LoginForm/loginForm'
import { RouteComponentProps } from 'react-router-dom'

interface LoginPropType {
    captcha: string | null
    isAuth: boolean
    login: (email: string | null, password: string | null, rememberMe: boolean, captcha: string | null) => void
}

export interface LoginFormDataType {
    email: string | null
    password: string | null
    RememberMe: boolean
    captcha: string | null
}

const Login:React.FC<LoginPropType & RouteComponentProps> = (props) => {
    const onSubmit = (FormData:LoginFormDataType): void => {
        const { email, password, RememberMe, captcha } = FormData
        props.login(email, password, RememberMe, captcha)
    }
    return (
        <div className={classes.login}>
            <ReduxLoginForm captcha={props.captcha} onSubmit={onSubmit}/>
        </div>
    )
}

export default Login