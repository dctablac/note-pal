import React, { useState, useEffect } from 'react'
import './ForgotPassword.css';

import { useAuth } from '../../contexts/AuthContext';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [disableSubmit, setDisableSubmit] = useState(true);
    const [loading, setLoading] = useState(false);
    const [submitBtnClass, setSubmitBtnClass] = useState('account-form-btn-disabled');

    const { currentUser } = useAuth();



    async function handleSubmit(e) {
        e.preventDefault();
        setErrorMsg('');
        setLoading(true);
        alert('Password reset email sent')
        setLoading(false);
        console.log(currentUser);
    }

    function handleInput() {
        if (email !== '') {
            setDisableSubmit(false);
            setSubmitBtnClass('account-form-btn');
        } else {
            setDisableSubmit(true);
            setSubmitBtnClass('account-form-btn-disabled')
        }
    }

    // Diable submit button if fields aren't populated
    useEffect(() => handleInput())

    return (
        <div className="account-form-page flex-container-center">
            <form className="account-form" onSubmit={handleSubmit}>
                <h2 className="account-form-title">Forgot Password?</h2>
                {(errorMsg !== '') && <p className="account-form-error-msg">{errorMsg}</p>}
                <input 
                    name="email" className="account-form-input" 
                    type="email" placeholder="Email" autoComplete="none"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                />
                <button className={submitBtnClass} disabled={disableSubmit || loading}>
                    {!loading && "Reset Password"}
                    {loading && "LOADING ..."}
                </button>
                <p className="account-form-footer"></p>
            </form>
        </div>
    )
}
