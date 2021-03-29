import { React, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../redux/action/auth';
import {
  Box,
  Input,
  Stack,
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  SimpleGrid,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
const SignUp = ({ register }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onSubmit = (e) => {
    e.preventDefault();
    register(formData);
  };
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={(e) => onSubmit(e)}>
          <ModalHeader>Sign Up</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}></ModalBody>
          <SimpleGrid columns={1} spacing={10}>
            <Box w='100%' p={4}>
              <Stack spacing={3}>
                <FormControl id='username'>
                  <FormLabel>Username</FormLabel>
                  <Input
                    name='name'
                    type='username'
                    variant='flushed'
                    onChange={onChange}
                    value={formData.name}
                  />
                </FormControl>
                <br></br>
                <FormControl id='email'>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name='email'
                    type='email'
                    variant='flushed'
                    onChange={onChange}
                    value={formData.email}
                  />
                </FormControl>
                <br></br>
                <FormControl id='password'>
                  <FormLabel>Password</FormLabel>
                  <InputGroup size='md'>
                    <Input
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
            <Button colorScheme='teal' variant='outline' mr={3} type='submit'>
              Register
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </>
  );
};
SignUp.propTypes = {
  register: PropTypes.func.isRequired,
};
export default connect(null, { register })(SignUp);
