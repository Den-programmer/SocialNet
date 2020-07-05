import React from 'react';
import { RememberMe, createField } from '../../../../common/Forms/forms';

const Remembering:React.FC<{}> = (props) => {
    return (
        <>
            {createField("checkbox", '', "RememberMe", RememberMe, [])}
        </>
    );
}

export default Remembering;