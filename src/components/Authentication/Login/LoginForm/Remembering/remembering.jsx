import React from 'react';
import { RememberMe, createField } from '../../../../common/Forms/forms';

const Remembering = (props) => {
    return (
        <>
            {createField("checkbox", null, "RememberMe", RememberMe, null)}
        </>
    );
}

export default Remembering;