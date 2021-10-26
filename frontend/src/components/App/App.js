import React, { Fragment } from 'react';
import { AuthProvider } from '../../contexts/AuthContext';
import Content from '../Content';
import NavBar from '../NavBar';

export default function App() {
    return (
        <AuthProvider>
        <Fragment>
          <NavBar />
          <Content />
        </Fragment>
        </AuthProvider>
    );
}