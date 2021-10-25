import React from 'react';
import './Signup.css';

import AccountForm from '../AccountForm';

export default function Signup() {

    function handleSubmit(e) {
        e.preventDefault(); // Prevent page refresh
        const { email, password } = e.target.elements;
        const passwordConfirm = e.target.elements['password-confirm'];
        console.log(email.value);
        console.log(password.value);
        console.log(passwordConfirm.value);
    }

    const signupProps = {
        handleSubmit: handleSubmit,
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
