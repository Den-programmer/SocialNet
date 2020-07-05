import React from 'react';
import { Input, createField } from '../../../../common/Forms/forms';
import { maxLengthCreator, required } from '../../../../../utils/validators/validators';

const maxLengthLogin = maxLengthCreator(90);

const Email:React.FC<{}> = (props) => {
    return (
        <>
            <h4>Email</h4>
            {createField("text", '', "email", Input, [maxLengthLogin, required])}
        </>
    ); 
}

export default Email;