import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './AccountForm.css';


export default function AccountForm(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [disableSubmit, setDisableSubmit] = useState(true);
    const [submitBtnClass, setSubmitBtnClass] = useState('account-form-btn');

    const { title, footerMsg, footerLinkLabel, footerLink, handleSubmit, checkPassConfirmation } = props;

    function handleInput(checkPassConfirm) {
        if (checkPassConfirm) {
            if (email !== '' && password !== '' && passwordConfirm !== '') {
                setDisableSubmit(false);
                setSubmitBtnClass('account-form-btn');
            } else {
                setDisableSubmit(true);
                setSubmitBtnClass('account-form-btn-disabled')
            }
        } else {
            if (email !== '' && password !== '') {
                setSubmitBtnClass('account-form-btn');
                setDisableSubmit(false);
            } else {
                setDisableSubmit(true);
                setSubmitBtnClass('account-form-btn-disabled')
            }
        }
    }

    // Diable submit button if fields aren't populated
    useEffect(() => handleInput(checkPassConfirmation))

    return (
        <div className="account-form-page flex-container-center">
            <form className="account-form" onSubmit={handleSubmit}>
                <h2 className="account-form-title">{title}</h2>
                <input 
                    name="email" className="account-form-input" 
                    type="email" placeholder="Email" autoComplete="none"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    name="password" className="account-form-input" 
                    type="password" placeholder="Password"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                />
                {
                (title === 'Sign Up') && 
                <input 
                    name="password-confirm" className="account-form-input"  
                    type="password" placeholder="Confirm password"
                    value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}
                />
                }
                <button className={submitBtnClass} disabled={disableSubmit}>{title}</button>
                <p className="account-form-footer">{footerMsg} <NavLink to={footerLink}>{footerLinkLabel}</NavLink></p>
                {
                    (title === 'Login') &&
                    <p className="account-form-footer"><NavLink to="/forgot-password">Forgot Password</NavLink></p>
                }
            </form>
        </div>
    )
}
