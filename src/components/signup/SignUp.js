import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/action/auth';
import { Redirect, Link } from 'react-router-dom';
import {
  Input,
  Stack,
  Button,
  FormControl,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import '../signin/authentication.css';

const SignUp = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
    <Redirect to="/signin" />;
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  if (isAuthenticated) {
    return <Redirect to="/signin" />;
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
              <span>Register</span>
            </div>
            <div className="authenticatio-form">
              <Stack spacing={3}>
                <FormControl id="username">
                  <Input
                    required
                    placeholder="Enter Username"
                    name="name"
                    type="username"
                    variant="flushed"
                    onChange={onChange}
                    value={formData.name}
                  />
                </FormControl>

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
                    <span>Terms</span>&<span>Policy</span>
                  </span>
                </div>
                <div className="authentication-submit-container">
                  <div className="flex-child signin-alreadyaccount-container">
                    <span className="flex-child">Already have an account?</span>
                    <Link to="/signin">
                      <span className="flex-child hover-underline">
                        sign in
                      </span>
                    </Link>
                  </div>
                  <div className="flex-child authentication-submit-button-container">
                    <Button
                      color="#63b3ed"
                      variant="ghost"
                      mr={3}
                      type="submit"
                    >
                      Register
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

export default SignUp;

