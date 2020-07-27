import React from 'react'
import classes from './forms.module.css'
import { Field, WrappedFieldProps } from 'redux-form'
import { FieldValidator } from '../../../utils/validators/validators'

export const Input: React.FC<WrappedFieldProps>= ({input, meta: { touched, error }, ...props}) => {
    const hasError = error && touched
    return (
        <div className={classes.Input}>
            <input {...input} {...props} className={hasError ? classes.error : ''}/>
            {hasError ? <p className={classes.errorText}> {error}</p> : ''}
        </div>
    )
}

export const Textarea: React.FC<WrappedFieldProps> = ({input, meta: { touched, error }, ...props}) => {
    const hasError = error && touched
    return (
        <div className={classes.textarea}>
            <textarea {...input} {...props} className={hasError ? classes.error : ''}/>
            {hasError ? <p className={classes.errorText}>{error}</p> : ''}
        </div>
    )
}
 
export const RememberMe: React.FC<WrappedFieldProps> = ({input, ...props}) => {
    return (
        <div className={classes.RememberMe}>
            <div className={classes.dFlexRememberMe}>
                <input {...input} {...props}/>
                <p>Remember me!</p>
            </div>
        </div>
    )
} 

export const createField = (type: string, 
                            placeholder: string, 
                            name: string, 
                            component: React.FC<WrappedFieldProps> | string, 
                            validators: Array<FieldValidator>) => {
    return <Field type={type} 
                  placeholder={placeholder} 
                  name={name} 
                  component={component} 
                  validate={validators}/>
}