import React from 'react';
import classes from './forms.module.css';
import { Field } from 'redux-form';

export const Input = ({input, meta, ...props}) => {
    const hasError = meta.error && meta.touched;
    return (
        <div className={classes.Input}>
            <input {...input} {...props} className={hasError ? classes.error : ''}/>
            {hasError ? <p className={classes.errorText}> {meta.error}</p> : ''}
        </div>
    );
}

export const Textarea = ({input, meta, ...props}) => {
    const hasError = meta.error && meta.touched;
    return (
        <div className={classes.textarea}>
            <textarea {...input} {...props} className={hasError ? classes.error : ''}/>
            {hasError ? <p className={classes.errorText}>{meta.error}</p> : ''}
        </div>
    );
}
export const RememberMe = ({input, meta, ...props}) => {
    return (
        <div className={classes.RememberMe}>
            <div className={classes.dFlexRememberMe}>
                <input {...input} {...props}/>
                <p>Remember me!</p>
            </div>
        </div>
    );
} 
export const createField = (type, placeholder, name, component, validators) => {
    return <Field type={type} 
                  placeholder={placeholder} 
                  name={name} 
                  component={component} 
                  validate={validators}/>
}