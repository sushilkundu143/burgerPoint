import React from 'react'
import {Link} from 'react-router-dom'

function Navbar() {
    return (
        <nav
            className="navbar is-primary"
            role="navigation"
            aria-label="main navigation">
            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                    <Link className="navbar-item" to="/">Order Online</Link>
                    <Link className="navbar-item" to="/list">Order List</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar