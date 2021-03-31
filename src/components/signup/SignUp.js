import { React, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../redux/action/auth";
import {
  Box,
  Input,
  Stack,
  Button,
  Center,
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
} from "@chakra-ui/react";
import { toast, ToastContainer } from "react-toastify";
const SignUp = ({ register }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
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
      <ToastContainer />
      <ModalContent>
        <form onSubmit={(e) => onSubmit(e)}>
          <ModalHeader>
            <Center>Sign Up</Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}></ModalBody>
          <SimpleGrid columns={1} spacing={10}>
            <Box w="100%" p={4}>
              <Stack spacing={3}>
                <FormControl id="username">
                  <Input
                    placeholder="Enter Username"
                    name="name"
                    type="username"
                    variant="flushed"
                    onChange={onChange}
                    value={formData.name}
                  />
                </FormControl>
                <br></br>
                <FormControl id="email">
                  <Input
                    placeholder="Enter Email"
                    name="email"
                    type="email"
                    variant="flushed"
                    onChange={onChange}
                    value={formData.email}
                  />
                </FormControl>
                <br></br>
                <FormControl id="password">
                  <InputGroup size="md">
                    <Input
                      placeholder="Enter Password"
                      name="password"
                      variant="flushed"
                      onChange={onChange}
                      value={formData.password}
                      type={show ? "text" : "password"}
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        colorScheme="teal"
                        variant="ghost"
                        h="1.75rem"
                        size="sm"
                        onClick={handleClick}
                      >
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </Stack>
            </Box>
          </SimpleGrid>
          <ModalFooter>
            <Button colorScheme="teal" variant="ghost" mr={3} type="submit">
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
// mapstate, dispatch
