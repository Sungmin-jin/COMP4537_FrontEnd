import React, { useEffect } from "react";
//components
import "./landing.css";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const Landing = ({ isAuthenticated }) => {
  const history = useHistory();
  useEffect(() => {
    if (isAuthenticated === true) {
      history.push("/home");
    }
  }, [isAuthenticated]);

  return (
    <>
      <div className="text-box">
        <h1 className="heading-primary">
          <span className="heading-primary-main">Kreamin Studio</span>
        </h1>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(Landing);
