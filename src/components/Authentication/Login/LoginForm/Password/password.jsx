import React from 'react';
import { Input, createField } from '../../../../common/Forms/forms';
import { maxLengthCreator, minLengthCreator, required } from '../../../../../utils/validators/validators';

const maxLengthPassword = maxLengthCreator(90);
const minLengthPassword = minLengthCreator(7);

const Password = (props) => {
    return (
        <>
            <h4>Password</h4>
            {createField("password", null, "password", Input, [required, minLengthPassword, maxLengthPassword])}
        </>
    );
}

export default Password; 