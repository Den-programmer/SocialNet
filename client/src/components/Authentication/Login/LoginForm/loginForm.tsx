import React from 'react';
import { useForm } from 'react-hook-form';
import classes from './loginForm.module.scss';
import { RegisterFormDataType } from '../../Login/login';
import LoginImg from './LoginImg/loginImg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'

interface LoginFormPropType {
    captcha: string | null
    isRegister: boolean
    setIsRegisterStatus: (status: boolean) => void
    onSubmit: (data: RegisterFormDataType) => void
}

const LoginForm: React.FC<LoginFormPropType> = ({ captcha, isRegister, setIsRegisterStatus, onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormDataType>()
    const defaultIconColor = { color: '#666666' }
    const validateIconColor = { color: '#FF0000' }

    return (
        <div className={classes.formWrapper}>
            <LoginImg />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={classes.formTitle}>
                    <h3>{isRegister ? 'Register' : 'Login'}</h3>
                </div>

                <div className={classes.formItem}>
                    <span className={classes.envelope}>
                        <FontAwesomeIcon style={errors.email?.message ? validateIconColor : defaultIconColor} className={classes.inputIcon} icon={faEnvelope} />
                    </span>
                    <input
                        type="text"
                        {...register('email', { required: 'Email is required', maxLength: 90 })}
                    />
                    {errors.email && <p className={classes.error}>{errors.email.message}</p>}
                </div>

                {isRegister && (
                    <div className={classes.formItem}>
                        <label>Username</label>
                        <input
                            type="text"
                            {...register('username', { required: 'Username is required', maxLength: 20 })}
                        />
                        {errors.username && <p className={classes.error}>{errors.username.message}</p>}
                    </div>
                )}

                <div className={classes.formItem}>
                    <span className={classes.lock}>
                        <FontAwesomeIcon style={errors.password?.message ? validateIconColor : defaultIconColor} className={classes.inputIcon} icon={faLock} />
                    </span>
                    <input
                        type="password"
                        {...register('password', { required: 'Password is required', minLength: 7, maxLength: 90 })}
                    />
                    {errors.password && <p className={classes.error}>{errors.password.message}</p>}
                </div>

                <div className={classes.confirmation}>
                    <div className={classes.rememberMe}>
                        <input type="checkbox" {...register('rememberMe')} />
                        <label>Remember Me</label>
                    </div>

                    {/* {captcha && <img className={classes.captcha} src={captcha} alt="captcha" />}
                    {captcha && (
                        <div className={classes.captchaInput}>
                            <input type="text" {...register('captcha', { required: 'Captcha is required' })} />
                            {errors.captcha && <p className={classes.error}>{errors.captcha.message}</p>}
                        </div>
                    )} */}

                    <div className={classes.btn_login}>
                        <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
                    </div>

                    <div className={classes.isCurrentFormContainer}>
                        {isRegister ? (
                            <span onClick={() => setIsRegisterStatus(false)} className={classes.isCurrentForm}>
                                Already have an account? Try to login!
                            </span>
                        ) : (
                            <span onClick={() => setIsRegisterStatus(true)} className={classes.isCurrentForm}>
                                Don't have an account? Try to register!
                            </span>
                        )}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LoginForm