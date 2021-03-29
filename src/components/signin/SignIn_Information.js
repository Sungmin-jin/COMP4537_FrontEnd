import { React, useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

import {
  Input,
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

const SignIn_Information = ({ closeForm }) => {
  return (
    <>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>Sign In </ModalBody>
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input type="email" />
          <FormLabel>Password</FormLabel>
          <Input type="password" />
        </FormControl>
        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
            Save
          </Button>
          <Button onClick={closeForm}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </>
  );
};
export default SignIn_Information;
