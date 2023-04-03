import React from 'react';

import AuthWrapper from './AuthWrapper';

const Auth = ({ component }) => {
    return (
        <AuthWrapper>
            {component}
        </AuthWrapper>
    );
};

export default Auth;
