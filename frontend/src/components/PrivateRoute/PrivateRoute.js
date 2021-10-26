import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';

// Checks if currentUser exists (a user is logged in)
// If so, user can access the page at the route
// Else, redirect to login page

export default function PrivateRoute({ component: Component, ...rest} ) {
    const { currentUser } = useAuth();

    return (
        <Route {...rest} render={(props) => {
            return (
                currentUser ? <Component {...props} /> : <Redirect to="/login" />
            )
        }} />
    );
}
