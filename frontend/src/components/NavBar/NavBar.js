import React from 'react';
import './NavBar.css'
import { NavLink } from 'react-router-dom';

export default function NavBar() {
    return (
        <nav id="nav-bar">
            <div className="nav-links">
                <NavLink className="nav-link" exact to="/" activeClassName="nav-link-active">Home</NavLink>
                <NavLink className="nav-link" to="/about" activeClassName="nav-link-active">About</NavLink>
                <NavLink className="nav-link" exact to="/notes" activeClassName="nav-link-active">My Notes</NavLink>
                <NavLink className="nav-link" to="/signup" activeClassName="nav-link-active">Sign Up</NavLink>
                <NavLink className="nav-link" to="/login" activeClassName="nav-link-active">Login</NavLink>
                <NavLink className="nav-link" to="/account" activeClassName="nav-link-active">Account</NavLink>
                <NavLink className="nav-link" to="/logout">Logout</NavLink>
            </div>
        </nav>
    )
}