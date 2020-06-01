import React from 'react';
import classes from './login.module.css';
import ReduxLoginForm from './LoginForm/loginForm';

const Login = (props) => {
    let onSubmit = (FormData) => {
        let { email, password, RememberMe } = FormData;
        props.login(email, password, RememberMe);
    }
    return (
        <div className={classes.login}>
            <div className={classes.title}>
                <h3>Login</h3>
            </div>
            <ReduxLoginForm onSubmit={onSubmit}/>
        </div>
    );
}

export default Login;