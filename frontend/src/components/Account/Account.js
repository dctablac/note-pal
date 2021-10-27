import React from 'react'
import './Account.css';
import { useAuth } from '../../contexts/AuthContext';

export default function Account() {
    const { currentUser } = useAuth();

    return (
        <div id="account-page">
            Account Page
            <p>{JSON.stringify(currentUser)}</p>
        </div>
    )
}
