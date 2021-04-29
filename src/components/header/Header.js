import React from 'react';

import { Link as ReachLink } from 'react-router-dom';
import { Link } from '@chakra-ui/react';
import './menu.css';
const Header = () => {
  return (
    <>
      <label for="toggle">&#9776;</label>
      <input type="checkbox" id="toggle" />

      <header className="header-top menu">
        <div className="header-top-flex-child">
          <Link as={ReachLink} to="/about">
            <span>About</span>
          </Link>
          <Link as={ReachLink} to="/signin">
            <span>Sign in</span>
          </Link>
        </div>
        <div className="header-top-flex-child">
          <Link as={ReachLink} to="/home">
            <span>KREAMIN STUDIO</span>
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;
