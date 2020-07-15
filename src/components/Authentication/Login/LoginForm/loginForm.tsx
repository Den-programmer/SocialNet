import React from 'react'
import classes from './loginForm.module.css'
import Email from './Email/email'
import Password from './Password/password'
import Remembering from './Remembering/remembering'
import { reduxForm, InjectedFormProps } from 'redux-form'
import { createField, Input } from '../../../common/Forms/forms'
import { required } from '../../../../utils/validators/validators'
import { LoginFormDataType } from '../../Login/login'

interface LoginFormPropType {
    captcha: string | null
}

const LoginForm:React.FC<InjectedFormProps<LoginFormDataType, LoginFormPropType> & LoginFormPropType> = ({ handleSubmit, error, captcha }) => {
    return (
        <div className={classes.formBlock}>
            <form onSubmit={handleSubmit}>
                <div className={classes.formItem}>
                    <Email />
                </div>
                <div className={classes.formItem}>
                    <Password />
                </div>
                <div className={classes.confirmation}>
                    <div className={classes.rememberMe}>
                        <Remembering />
                    </div>

                    {captcha && <img className={classes.captcha} src={captcha} alt="captcha"/>}
                    {captcha && <div className={classes.captchaInput}>{createField("text", "", "captcha", Input, [required])}</div>}

                    {error && <div className={classes.error}>
                        <p>{error}</p>
                    </div>}
                    <div className={classes.btn_login}>
                        <button>Login</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
const ReduxLoginForm = reduxForm<LoginFormDataType, LoginFormPropType>( { form: 'login' } )(LoginForm)

export default ReduxLoginForm