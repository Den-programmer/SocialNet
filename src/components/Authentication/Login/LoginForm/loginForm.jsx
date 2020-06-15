import React from 'react';
import classes from './loginForm.module.css';
import Email from './Email/email';
import Password from './Password/password';
import Remembering from './Remembering/remembering';
import { reduxForm } from 'redux-form';


const LoginForm = ({handleSubmit, error}) => {
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
                    {error && <div className={classes.error}>
                        <p>{error}</p>
                    </div>}
                    <div className={classes.btn_login}>
                        <button>Login</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
const ReduxLoginForm = reduxForm({
    form: 'login'
})(LoginForm);

export default ReduxLoginForm;