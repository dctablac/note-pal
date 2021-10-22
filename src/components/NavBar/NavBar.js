import React from 'react';
import './NavBar.css'
import { NavLink } from 'react-router-dom';

export default function NavBar() {
    return (
        <nav id="nav-bar">
            <div className="nav-links">
                <NavLink className="nav-link" exact to="/" activeClassName="nav-link-active">Home</NavLink>
                <NavLink className="nav-link" to="/about" activeClassName="nav-link-active">About</NavLink>
            </div>
        </nav>
    )
}