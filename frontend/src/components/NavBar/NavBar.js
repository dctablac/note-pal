import React from 'react';
import './NavBar.css'
import { NavLink, useHistory } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';

export default function NavBar() {
    const { currentUser, logout } = useAuth();
    const history = useHistory();

    async function handleLogout(e) {
        if (currentUser) {
            try {
                await logout();
                alert('Logout successful');
                history.push('/login');
            } catch(err) {
                console.log(err);
                alert('Failed to logout');
            }
        }
    }

    return (
        <nav id="nav-bar">
            <div className="nav-links">
                <NavLink className="nav-link" exact to="/" activeClassName="nav-link-active">Home</NavLink>
                <NavLink className="nav-link" to="/about" activeClassName="nav-link-active">About</NavLink>
                {currentUser && <NavLink className="nav-link" exact to="/notes" activeClassName="nav-link-active">My Notes</NavLink>}
                {!currentUser && <NavLink className="nav-link" to="/signup" activeClassName="nav-link-active">Sign Up</NavLink>}
                {!currentUser && <NavLink className="nav-link" to="/login" activeClassName="nav-link-active">Login</NavLink>}
                {currentUser && <NavLink className="nav-link" to="/account" activeClassName="nav-link-active">Account</NavLink>}
                {currentUser && <button className="logout-btn" to="/logout" onClick={handleLogout}>Logout</button>}
            </div>
        </nav>
    )
}