import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../redux/action/auth';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './dashboard.css';

const Dashboard = ({ logout, isAuthenticated }) => {
  const onSubmit = async (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <>
      <div className="header">
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="text-box-dashboard">
            <h1 className="heading-primary-main">Kreamin Studio</h1>
            <h2 className="heading-primary-welcome">
              <span> Welcome!</span>
            </h2>
            <div className="dashboard-view-create-flex-container">
              <div className="dashboard-view-create-flex-child">
                <Link to="/posts">
                  <span className="dashboard-hover">View</span>
                </Link>
              </div>
              <div className="dashboard-view-create-flex-child">
                <Link to="/postForm">
                  <span className="dashboard-hover">Create</span>
                </Link>
              </div>
            </div>

            <div className="dashboard-profile-signout">
              <h3>
                <Link to="/user">
                  <span className="dashboard-hover">Profile</span>
                </Link>
              </h3>
              <h3 className="footer-primary" onClick={logout}>
                <span className="dashboard-hover">Sign Out</span>
              </h3>
            </div>
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
