import React from 'react'
import classes from './login.module.css'
import LoginForm from './LoginForm/loginForm'
import { selectCaptchaUrl, selectIsRegisterStatus } from '../../../BLL/selectors/auth-selectors'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import { useLoginMutation, useRegisterMutation } from '../../../DAL/authApi'
import { authActions } from '../../../BLL/reducer-auth'
import { useLocation, useNavigate } from 'react-router-dom'

interface LoginFormDataType {
    email: string | null
    password: string | null
    rememberMe: boolean
    captcha: string | null
}

export interface RegisterFormDataType extends LoginFormDataType {
    username: string | null
}

const Login: React.FC = () => {
    const dispatch = useAppDispatch()
    const location = useLocation()  
    const navigate = useNavigate()

    const captcha = useAppSelector(selectCaptchaUrl)
    const isRegister = useAppSelector(selectIsRegisterStatus)

    const { setLastUrl, setIsRegisterStatus } = authActions

    const [login, { isLoading: isLoadingLogin }] = useLoginMutation()
    const [register, { isLoading: isLoadingRegistration}] = useRegisterMutation()

    const onSubmitLogin = async (formData: LoginFormDataType) => {
        await login(formData).unwrap()
        const redirectTo = location.state?.from || '/'
        dispatch(setLastUrl(redirectTo))
        navigate(redirectTo)
    }

    const onSubmitRegister = async (formData: RegisterFormDataType) => {
        await register(formData).unwrap()
        const redirectTo = location.state?.from || '/'
        dispatch(setLastUrl(redirectTo))
        navigate(redirectTo)
    }

    return (
        <div className={classes.login}>
            <LoginForm
                isLoadingLogin={isLoadingLogin}
                isLoadingRegistration={isLoadingRegistration}
                captcha={captcha}
                isRegister={isRegister}
                setIsRegisterStatus={(status) => dispatch(setIsRegisterStatus(status))}
                onSubmit={isRegister ? onSubmitRegister : onSubmitLogin}
            />
        </div>
    );
};

export default Login
