import { React } from 'react';
import { Link as ReachLink } from 'react-router-dom';
import { Link } from '@chakra-ui/react';
//components
import './landing.css';
import Header from '../../components/header/Header';

const Landing = () => {
  return (
    <div className="container">
      <Header />
      <div className="text-box">
        <button className="header-btn">
          <h1 className="heading-primary">
            <span className="heading-primary-main">Kreamin Studio</span>
          </h1>
        </button>
      </div>
      <div className="footer-container">
        <span>© COPYRIGHT 2021 | KREAMIN STUDIO | ALL RIGHTS RESERVED.</span>
      </div>
    </div>
  );
};

export default Landing;
