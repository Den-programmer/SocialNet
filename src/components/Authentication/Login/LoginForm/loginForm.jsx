import React from 'react';
import classes from './loginForm.module.css';
import { reduxForm, Field } from 'redux-form';
import { Input, RememberMe } from '../../../common/Forms/forms';
import { maxLengthCreator, minLengthCreator, required } from '../../../../utils/validators/validators';

const maxLengthLogin = maxLengthCreator(90);
const maxLengthPassword = maxLengthCreator(90);
const minLengthPassword = minLengthCreator(8);

const LoginForm = (props) => {
    return (
        <div className={classes.formBlock}>
            <form onSubmit={props.handleSubmit}>
                <div className={classes.formItem}>
                    <h4>Login</h4>
                    <Field type="text" name="login" component={Input} validate={[required, maxLengthLogin]}/>
                </div>
                <div className={classes.formItem}>
                    <h4>Password</h4>
                    <Field type="password" name="password" component={Input} validate={[required, maxLengthPassword, minLengthPassword]}/>
                </div>
                <div className={classes.confirmation}>
                    <div className={classes.rememberMe}>
                        <Field type="checkbox" name="RememberMe" component={RememberMe} validate={[required]}/>
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

export default LoginReduxForm;