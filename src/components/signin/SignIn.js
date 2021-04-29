import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect, Link as ReachLink } from 'react-router-dom';
import { login } from '../../redux/action/auth';
import {
  Link,
  Input,
  Stack,
  Button,
  FormControl,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';

import './authentication.css';

const SignIn = ({ login, isAuthenticated }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isAuthenticated) {
    return <Redirect to="/home" />;
  }

  return (
    <>
      <div className="authentication-container">
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="authentication-form-container">
            <div className="authentication-title">
              <span className="title-name">KREAMIN STUDIO</span>
              <br />
              <span className="title-description">Buy and sell your goods</span>
            </div>
            <div className="description-text">
              <span>Sign In</span>
            </div>
            <div className="authenticatio-form">
              <Stack spacing={3}>
                <FormControl id="email">
                  <Input
                    required
                    placeholder="Enter Email"
                    name="email"
                    type="email"
                    variant="flushed"
                    onChange={onChange}
                    value={formData.email}
                  />
                </FormControl>
                <FormControl id="password">
                  <InputGroup size="md">
                    <Input
                      required
                      placeholder="Enter Password"
                      name="password"
                      variant="flushed"
                      onChange={onChange}
                      value={formData.password}
                      type={show ? 'text' : 'password'}
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        color="#63b3ed"
                        variant="ghost"
                        h="1.75rem"
                        size="sm"
                        onClick={handleClick}
                      >
                        {show ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <div className="terms-policy-container">
                  <span>
                    I Accept to
                    <span>
                      <a href="#"> Terms </a>
                    </span>
                    &
                    <span>
                      <a href="#"> Policy </a>
                    </span>
                  </span>
                </div>
                <div className="authentication-submit-container">
                  <div className="flex-child signup-forgotpassword-container">
                    <Link as={ReachLink} to="/signup">
                      <span className="flex-child">Sign Up</span>
                    </Link>

                    <span className="flex-child">Forgot Password</span>
                  </div>
                  <div className="flex-child authentication-submit-button-container">
                    <Button
                      color="#63b3ed"
                      variant="ghost"
                      mr={3}
                      type="submit"
                    >
                      Sign In
                    </Button>
                  </div>
                </div>
              </Stack>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

SignIn.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(SignIn);
