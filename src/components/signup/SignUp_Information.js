import React from "react";
import {
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
const SignUp_Information = ({ closeForm }) => {
  return (
    <>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create your account</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}></ModalBody>

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

export default SignUp_Information;
