import React, { useState } from 'react';
import './Login.css';

import AccountForm from '../AccountForm';
import { useAuth } from '../../contexts/AuthContext';
import { authErrorMessages } from '../../firebase.js';
import { useHistory } from 'react-router-dom';

export default function Login() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        const { email, password } = e.target.elements;

        try {
            setError('');
            setLoading(true);
            await login(email.value, password.value);
            alert('Logged in successfully');
            setLoading(false);
            history.push('/notes');
        } catch(err) {
            setError(authErrorMessages[err.code]);
            setLoading(false);
        }
    }

    const loginProps = {
        handleSubmit: handleSubmit,
        errorMsg: error,
        loading: loading,
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
