import React from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../services/authService';

const withAuth = (Component) => {
    class AuthComponent extends React.Component {
        render() {
            const currentUser = authService.getCurrentUser();
            if (!currentUser) {
                return <Navigate to="/login" />;
            }
            return <Component {...this.props} />;
        }
    }
    return AuthComponent;
};

export default withAuth;