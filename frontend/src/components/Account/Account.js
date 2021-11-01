import React, { useState } from 'react'
import './Account.css';
import { useAuth } from '../../contexts/AuthContext';

export default function Account(props) {
    const { isNightMode, makeNightMode } = props;
    const { currentUser } = useAuth();

    function getCreationDate(user) {
        const createdAt = Number(user.reloadUserInfo.createdAt);
        const date = new Date(createdAt).toISOString();
        return date.split('T')[0];
    }

    return (
        <div id="account-page">
            <div id="account-details">
                <div className="account-detail">
                    <label>Email</label>
                    <p>{currentUser.email}</p>
                </div>
                <div className="account-detail">
                    <label>Email Verified</label>
                    <p>{currentUser.emailVerified ? "Yes" : "No"}</p>
                </div>
                <div className="account-detail">
                    <label>Note taker since:</label>
                    <p>{getCreationDate(currentUser)}</p>
                </div>
                <div className="account-detail">
                    <label>Night Mode</label>
                    <label htmlFor="night-mode-switch" id={isNightMode ? "night-mode-switch-label-active" : "night-mode-switch-label"} onClick={() => makeNightMode()}>
                        <input type="checkbox" name="night-mode-switch" id="night-mode-switch"/>
                    </label>
                </div>
            </div>
        </div>
    )
}
