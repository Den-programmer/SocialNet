import React from 'react'
import classes from './login.module.css'
import LoginForm from './LoginForm/loginForm'
import { RouteComponentProps } from 'react-router-dom'

interface LoginPropType {
    captcha: string | null
    isAuth: boolean
    isRegister: boolean
    login: (email: string | null, password: string | null, rememberMe: boolean, captcha: string | null) => void
    setIsRegisterStatus: (status: boolean) => void
    register: (email: string | null, username: string | null, password: string | null, rememberMe: boolean, captcha: string | null) => void
}

interface LoginFormDataType {
    email: string | null
    password: string | null
    rememberMe: boolean
    captcha: string | null
}

export interface RegisterFormDataType extends LoginFormDataType {
    username: string | null
}

const Login: React.FC<LoginPropType & RouteComponentProps> = (props) => {
    const onSubmitLogin = (formData: LoginFormDataType) => {
        const { email, password, rememberMe, captcha } = formData
        props.login(email, password, rememberMe, captcha)
    }

    const onSubmitRegister = (formData: RegisterFormDataType) => {
        const { email, username, password, rememberMe, captcha } = formData
        props.register(email, username, password, rememberMe, captcha)
    }

    return (
        <div className={classes.login}>
            <LoginForm
                captcha={props.captcha}
                isRegister={props.isRegister}
                setIsRegisterStatus={props.setIsRegisterStatus}
                onSubmit={props.isRegister ? onSubmitRegister : onSubmitLogin}
            />
        </div>
    );
};

export default Login