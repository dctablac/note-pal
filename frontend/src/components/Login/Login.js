import React from 'react';
import './Login.css';

import AccountForm from '../AccountForm';

export default function Login() {

    function handleSubmit(e) {
        e.preventDefault();
    }

    const loginProps = {
        handleSubmit: handleSubmit,
        title: 'Login',
        footerMsg: 'Don\'t have an account?',
        footerLink: '/signup',
        footerLinkLabel: 'Sign Up',
        checkPassConfirmation: false
    }

    return (
        <AccountForm {...loginProps} />
    )
}
