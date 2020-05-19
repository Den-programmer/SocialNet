import React from 'react';
import { Field } from 'redux-form';
import { RememberMe } from '../../../../common/Forms/forms';

const Remembering = (props) => {
    return (
        <>
            <Field type="checkbox" name="RememberMe" component={RememberMe}/>
        </>
    );
}

export default Remembering;