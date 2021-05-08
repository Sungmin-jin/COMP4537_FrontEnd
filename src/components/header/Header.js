import React from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../redux/action/auth';

import './menu.css';

const Header = ({ isAuthenticated, logout }) => {
  return (
    <>
      <input id="menu__toggle" type="checkbox" />
      <label className="menu__btn" htmlFor="menu__toggle">
        <span></span>
      </label>
      <header className="header-top menu__box" id="header-scroll">
        <div className="header-top-flex-child">
          <Link to="/about">
            <span className="menu__item">About</span>
          </Link>
          {isAuthenticated ? (
            <Link to="/">
              <span onClick={logout} className="menu__item">
                Sign out
              </span>
            </Link>
          ) : (
            <Link to="/signin">
              <span className="menu__item">Sign in</span>
            </Link>
          )}
        </div>
        <div className="header-top-flex-child">
          {isAuthenticated ? (
            <Link to="/home">
              <span className="menu__item">KREAMIN STUDIO</span>
            </Link>
          ) : (
            <Link to="/">
              <span className="menu__item">KREAMIN STUDIO</span>
            </Link>
          )}
        </div>
      </header>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Header);
