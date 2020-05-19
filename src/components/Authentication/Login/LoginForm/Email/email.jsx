import React from 'react';
import { Input } from '../../../../common/Forms/forms';
import { Field } from 'redux-form';
import { maxLengthCreator, required } from '../../../../../utils/validators/validators';

const maxLengthLogin = maxLengthCreator(90);

const Email = (props) => {
    return (
        <>
            <h4>Email</h4>
            <Field type="text" name="email" component={Input} validate={[required, maxLengthLogin]}/>
        </>
    ); 
}

export default Email;