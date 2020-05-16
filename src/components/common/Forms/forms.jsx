import React from 'react';
import classes from './forms.module.css';

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
    const hasError = meta.error && meta.touched;
    return (
        <div className={classes.RememberMe}>
            <div className={classes.dFlexRememberMe}>
                <input {...input} {...props} className={hasError ? classes.error : ''}/>
                <p>Remember me!</p>
            </div>
            {hasError ? <p className={classes.errorText}> {meta.error}</p> : ''}
        </div>
    );
} 