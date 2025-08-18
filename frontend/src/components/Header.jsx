import React from 'react';
import '../styles/header.css';
import { FaBars } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="header-nobile">
      <div className="header-content">
        <h1 className="logo">N<span className="logo-detail">o</span>bile</h1>
        <FaBars className="menu-icon" />
      </div>
    </header>
  );
};

export default Header;