import React from 'react'
import './Account.css';
import { useAuth } from '../../contexts/AuthContext';

export default function Account(props) {
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
                    <label>Note Taker Since</label>
                    <p>{getCreationDate(currentUser)}</p>
                </div>
            </div>
        </div>
    )
}
