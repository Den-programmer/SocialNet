import React from 'react';
import { Input } from '../../../../common/Forms/forms';
import { Field } from 'redux-form';
import { maxLengthCreator, minLengthCreator, required } from '../../../../../utils/validators/validators';

const maxLengthPassword = maxLengthCreator(90);
const minLengthPassword = minLengthCreator(7);

const Password = (props) => {
    return (
        <>
            <h4>Password</h4>
            <Field type="password" name="password" component={Input} validate={[required, maxLengthPassword, minLengthPassword]} />
        </>
    );
}

export default Password; 