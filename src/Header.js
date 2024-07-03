import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

  return (
    <header>
      <div className="header-container">
        <div className="header-text">sham-scrap</div>
        <nav>
          <ul className='flex'>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;