import React, { useState } from 'react';
import './Signup.css';

import AccountForm from '../AccountForm';
import { useAuth } from '../../contexts/AuthContext';
import { authErrorMessages } from '../../firebase.js';
import { useHistory } from 'react-router-dom';

export default function Signup() {
    const MESSAGES = require('../../messages.json');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault(); // Prevent page refresh
        const { email, password } = e.target.elements;
        const passwordConfirm = e.target.elements['password-confirm'];

        if (password.value !== passwordConfirm.value) {
            return setMessage(MESSAGES.PASSWORD_MISMATCH);
        }
        try {
            setMessage('');
            setLoading(true);
            await signup(email.value, password.value);
            history.push('/notes');
        } catch(err) {
            setMessage(authErrorMessages[err.code]);
            setLoading(false);
        }
    }

    const signupProps = {
        handleSubmit: handleSubmit,
        errorMsg: message,
        loading: loading,
        title: MESSAGES.SIGNUP_FORM_TITLE,
        footerMsg: MESSAGES.LOGIN_REDIRECT_MSG,
        footerLink: MESSAGES.LOGIN_REDIRECT_LINK,
        footerLinkLabel: MESSAGES.LOGIN_REDIRECT_LABEL,
        checkPassConfirmation: true
    }

    return (
        <AccountForm {...signupProps}/>
    )
}
