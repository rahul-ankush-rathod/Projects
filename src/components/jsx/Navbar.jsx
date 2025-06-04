import React from 'react'
import { Link } from "react-router-dom";
import SidePart from './Sidepart';
import '../css/Navbar.css';




function Navbar() {
  return (
    <nav className="navbar">
    <h2 className="logo">AI Code Generator</h2>
    <SidePart/>
    <ul className="nav-links">
    <Link to="/about">About</Link>
    <Link to="/about">Home</Link>
    <Link to="/about">Feature</Link>
    <Link to="/about">Contact</Link>
    </ul>
  </nav>
);
} 

export default Navbar