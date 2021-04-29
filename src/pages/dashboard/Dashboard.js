import React, { useEffect } from 'react';
import { Link as ReachLink } from 'react-router-dom';
import { logout } from '../../redux/action/auth';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Link,
  Text,
  Grid,
  GridItem,
  Center,
  Stack,
  Container,
} from '@chakra-ui/react';

import './dashboard.css';

const Dashboard = ({ logout, isAuthenticated }) => {
  // 2 bool values for login, and sign up
  useEffect(() => {
    // if (isAuthenticated){ toastsadkflasdf}
    console.log(isAuthenticated);
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <>
      <div className="header">
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="text-box">
            <h1 className="heading-primary-main">Kreamin Studio</h1>
            <h3 className="heading-primary-welcome">
              <span> Welcome!</span>
            </h3>
            <div className="heading-secondary">
              <Link as={ReachLink} to="/posts">
                <span>View</span>
              </Link>
              <Link as={ReachLink} to="/postForm">
                <span>Create</span>
              </Link>
            </div>
            <h3>
              <Link as={ReachLink} to="/user">
                <span>Profile</span>
              </Link>
            </h3>
            <h3 className="footer-primary" onClick={logout}>
              <span>Sign Out</span>
            </h3>
          </div>
        </form>
      </div>
    </>
  );
};
Dashboard.propTypes = {
  logout: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { logout })(Dashboard);
