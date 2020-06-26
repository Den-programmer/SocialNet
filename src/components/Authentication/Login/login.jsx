import React from 'react';
import classes from './login.module.css';
import ReduxLoginForm from './LoginForm/loginForm';

const Login = (props) => {
    let onSubmit = (FormData) => {
        let { email, password, RememberMe, captcha } = FormData;
        props.login(email, password, RememberMe, captcha);
    }
    return (
        <div className={classes.login}>
            <div className={classes.title}>
                <h3>Login</h3>
            </div>
            <ReduxLoginForm captcha={props.captcha} onSubmit={onSubmit}/>
        </div>
    );
}

export default Login;