import React from 'react';
import Preloader from '../components/common/preloader/preloader';

export const withReactSuspence = (Component) => (props) => {
    return (
        <React.Suspence fallback={<Preloader />}>
            <Component {...props} />
        </React.Suspence>
    );
}

