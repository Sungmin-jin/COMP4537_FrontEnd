import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../redux/action/auth';
import {
  Box,
  Input,
  Stack,
  Center,
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  SimpleGrid,
  ModalBody,
  ModalCloseButton,
  FormControl,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';

const SignIn = ({ login }) => {
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
  return (
    <>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={(e) => onSubmit(e)}>
          <ModalHeader>
            <Center>Sign In</Center>
          </ModalHeader>
          <ModalCloseButton />
          <SimpleGrid columns={1} spacing={10}>
            <Box w='100%' p={4}>
              <Stack spacing={3}>
                <FormControl id='email'>
                  <Input
                    placeholder='Enter Email'
                    name='email'
                    type='email'
                    variant='flushed'
                    onChange={onChange}
                    value={formData.email}
                  />
                </FormControl>
                <br></br>
                <FormControl id='password'>
                  <InputGroup size='md'>
                    <Input
                      placeholder='Enter Password'
                      name='password'
                      variant='flushed'
                      onChange={onChange}
                      value={formData.password}
                      type={show ? 'text' : 'password'}
                    />
                    <InputRightElement width='4.5rem'>
                      <Button
                        colorScheme='teal'
                        variant='ghost'
                        h='1.75rem'
                        size='sm'
                        onClick={handleClick}
                      >
                        {show ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </Stack>
            </Box>
          </SimpleGrid>
          <ModalFooter>
            <Button colorScheme='teal' variant='ghost' mr={3} type='submit'>
              Sign In
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </>
  );
};

SignIn.propTypes = {
  login: PropTypes.func.isRequired,
};
export default connect(null, { login })(SignIn);
