import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';

// restricted prop:
//      true: Logged in users cannot access this public route
//      false: Logged out users may access this public route

export default function PublicRoute({ component: Component, restricted, ...rest }) {
    const { currentUser } = useAuth();

    return (
        <Route {...rest} render={(props) => {
            return (currentUser && restricted) ? <Redirect to="/notes" /> : <Component {...props} /> 
        }} />
    );
}
