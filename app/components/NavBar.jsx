import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Link, NavLink } from 'react-router-dom';

<Link to="/about">About</Link>

const NavBar = () => (
      <nav className="nav-bar">
        <Link to="/"><p className="home-nav">Home</p></Link>
        <ul className="nav-elements">
          <Link to="/campuses"><li>Campuses</li></Link>
          <Link to="/students"><li>Students</li></Link>
        </ul>
      </nav>
)


export default NavBar;
