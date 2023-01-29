import React from 'react'
import classes from './login.module.css'
import ReduxLoginForm from './LoginForm/loginForm'
import { RouteComponentProps } from 'react-router-dom'

interface LoginPropType {
    captcha: string | null
    isAuth: boolean
    isRegister: boolean
    login: (email: string | null, password: string | null, rememberMe: boolean, captcha: string | null) => void
    setIsRegisterStatus: (status: boolean) => void
    register: (email: string | null, 
        username: string | null, 
        password: string | null, 
        rememberMe: boolean, 
        captcha: string | null) => void
}

interface LoginFormDataType {
    email: string | null
    password: string | null
    RememberMe: boolean
    captcha: string | null
}

export interface RegisterFormDataType extends LoginFormDataType {
    username: string | null
}

const Login:React.FC<LoginPropType & RouteComponentProps> = (props) => {
    const onSubmitLogin = (FormData:LoginFormDataType): void => {
        const { email, password, RememberMe, captcha } = FormData
        props.login(email, password, RememberMe, captcha)
    }
    const onSubmitRegister = (FormData: RegisterFormDataType): void => {
        const { email, username, password, RememberMe, captcha } = FormData
        props.register(email, username, password, RememberMe, captcha)
    }
    return (
        <div className={classes.login}>
            <ReduxLoginForm captcha={props.captcha} 
            isRegister={props.isRegister} 
            setIsRegisterStatus={props.setIsRegisterStatus} 
            onSubmit={props.isRegister ? onSubmitRegister : onSubmitLogin}/>
        </div>
    )
}

export default Login