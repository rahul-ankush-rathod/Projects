import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import '../css/Sidepart.css';

const SidePart = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="side-container">
      {/* Hamburger Icon (Shows only when sidebar is closed) */}
      {!isOpen && (
        <button className="hamburger" onClick={() => setIsOpen(true)}>
          <FaBars />
        </button>
      )}

      {/* Sidebar Menu */}
      <nav className={`sidebar ${isOpen ? "open" : ""}`}>
        {/* Close Button inside Sidebar */}
        {isOpen && (
          <button className="close-btn" onClick={() => setIsOpen(false)}>
            <FaTimes />
          </button>
        )}

        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/features">Features</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default SidePart;
