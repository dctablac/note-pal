import React, { useState } from 'react';
import './Login.css';

import AccountForm from '../AccountForm';
import { useAuth } from '../../contexts/AuthContext';
import { authErrorMessages } from '../../firebase.js';
import { useHistory } from 'react-router-dom';

export default function Login() {
    const MESSAGES = require('../../messages.json');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        const { email, password } = e.target.elements;

        try {
            setMessage('');
            setLoading(true);
            await login(email.value, password.value);
            history.push('/notes');
        } catch(err) {
            setMessage(authErrorMessages[err.code]);
            setLoading(false);
        }
    }

    const loginProps = {
        handleSubmit: handleSubmit,
        errorMsg: message,
        loading: loading,
        title: MESSAGES.LOGIN_FORM_TITLE,
        footerMsg: MESSAGES.SIGNUP_REDIRECT_MSG,
        footerLink: MESSAGES.SIGNUP_REDIRECT_LINK,
        footerLinkLabel: MESSAGES.SIGNUP_REDIRECT_LABEL,
        checkPassConfirmation: false
    }

    return (
        <AccountForm {...loginProps} />
    )
}
