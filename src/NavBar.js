import React from 'react';
import './NavBar.css';

import {
    BrowserRouter as Router,
    Route,
  } from 'react-router-dom';
import { Link } from 'react-router-dom';

const NavBar = () => (
    <nav id="menu-main">
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/about">About</Link>
            </li>
            <li>
                <Link to="/collections">EXPLORE COLLECTIONS</Link>
            </li>
            <li>
                <Link to="/items">BROWSE ITEMS</Link>
            </li>
        </ul>
    </nav>
);

export default NavBar;
