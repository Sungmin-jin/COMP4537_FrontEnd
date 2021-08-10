import React, { useEffect } from "react";
import "./landing.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Landing = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
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

export default Landing;
