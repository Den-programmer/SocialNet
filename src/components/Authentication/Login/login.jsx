import React from 'react';
import classes from './login.module.css';
import LoginReduxForm from './LoginForm/loginForm';

const Login = (props) => {
    let onSubmit = (formData) => {
        console.log(formData);
    }
    return (
        <div className={classes.login}>
            <div className={classes.title}>
                <h3>Login</h3>
            </div>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
}

export default Login;