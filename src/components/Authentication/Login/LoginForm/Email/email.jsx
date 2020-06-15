import React from 'react';
import { Input, createField } from '../../../../common/Forms/forms';
import { maxLengthCreator, required } from '../../../../../utils/validators/validators';

const maxLengthLogin = maxLengthCreator(90);

const Email = (props) => {
    return (
        <>
            <h4>Email</h4>
            {createField("text", null, "email", Input, [maxLengthLogin, required])}
        </>
    ); 
}

export default Email;