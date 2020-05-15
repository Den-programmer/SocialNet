import React from 'react';
import classes from './login.module.css';
import { reduxForm, Field } from 'redux-form';

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

const LoginForm = (props) => {
    return (
        <div className={classes.formBlock}>
            <form onSubmit={props.handleSubmit}>
                <div className={classes.formItem}>
                    <h4>Login</h4>
                    <Field type="text" name="login" component="input"/>
                </div>
                <div className={classes.formItem}>
                    <h4>Password</h4>
                    <Field type="password" name="password" component="input"/>
                </div>
                <div className={classes.confirmation}>
                    <div className={classes.rememberMe}>
                        <Field type="checkbox" name="RememberMe" component="input"/>
                        <p>Remember me!</p>
                    </div>
                    <div className={classes.btn_login}>
                        <button>Login</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm);

export default Login;