import React from 'react';

import { Link } from 'react-router-dom';

import './menu.css';

const Header = () => {
  // useEffect(() => {
  //   const header = document.getElementById('header-scroll');
  //   const sticky = header.offsetTop;

  //   const stickyScroll = window.addEventListener('scroll', () => {
  //     if (window.pageYOffset > sticky) {
  //       header.classList.add('sticky');
  //     } else {
  //       header.classList.remove('sticky');
  //     }
  //   });
  //   return () => {
  //     window.removeEventListener('scroll', stickyScroll);
  //   };
  // }, []);
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
          <Link to="/signin">
            <span className="menu__item">Sign in</span>
          </Link>
        </div>
        <div className="header-top-flex-child">
          <Link to="/">
            <span className="menu__item">KREAMIN STUDIO</span>
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;
