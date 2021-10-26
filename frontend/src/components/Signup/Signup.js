import React, { useState } from 'react';
import './Signup.css';

import AccountForm from '../AccountForm';
import { useAuth } from '../../contexts/AuthContext';
import { authErrorMessages } from '../../firebase.js';
import { useHistory } from 'react-router-dom';

export default function Signup() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault(); // Prevent page refresh
        const { email, password } = e.target.elements;
        const passwordConfirm = e.target.elements['password-confirm'];

        if (password.value !== passwordConfirm.value) {
            return setError('Passwords do not match');
        }
        try {
            setError('');
            setLoading(true);
            await signup(email.value, password.value);
            alert('Account created successfully');
            history.push('/notes');
        } catch(err) {
            setError(authErrorMessages[err.code]);
        }
        setLoading(false);
    }

    const signupProps = {
        handleSubmit: handleSubmit,
        errorMsg: error,
        loading: loading,
        title: 'Sign Up',
        footerMsg: 'Already have an account?',
        footerLink: '/login',
        footerLinkLabel: 'Login',
        checkPassConfirmation: true
    }

    return (
        <AccountForm {...signupProps}/>
    )
}
