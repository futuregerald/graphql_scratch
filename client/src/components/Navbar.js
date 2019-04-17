import React from 'react';
import {NavLink} from 'react-router-dom'

const Navbar = () => (
    <nav>
        <NavBarAuth />
    </nav>
)

const NavBarAuth = () => (
    <ul>
        <li>
            <NavLink to="/" exact>Home</NavLink>
        </li>
        <li>
            <NavLink to="/search">Search</NavLink>
        </li>
        <li>
            <NavLink to="/recipe/add">Add Recipe</NavLink>
        </li>
        <li>
            <NavLink to="/profile">Profile</NavLink>
        </li>
        <li>
            <button>Signout</button>
        </li>
    </ul>
)

const NavbarUnAuth = () => (
<ul>
    <li>
        <NavLink to="/" exact>Home</NavLink>
    </li>
    <li>
        <NavLink to="/search" exact>search</NavLink>
    </li>
    <li>
        <NavLink to="/signin" exact>signin</NavLink>
    </li>
    <li>
        <NavLink to="/signup" exact>signup</NavLink>
    </li>
</ul>
)

export default Navbar