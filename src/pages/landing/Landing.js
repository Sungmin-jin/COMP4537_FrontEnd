import { React, useState, useRef } from "react";
import { Redirect } from "react-router-dom";
import {
  Text,
  Center,
  Divider,
  Button,
  Stack,
  Drawer,
  Feature,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Modal,
} from "@chakra-ui/react";
//components
import SignIn from "../../components/signin/SignIn";
import SignUp from "../../components/signup/SignUp";

import PropTypes from "prop-types";
import { connect } from "react-redux";

const Landing = ({ isAuthenticated }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [signInModal, setSignInModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  const initialRef = useRef();
  const finalRef = useRef();
  if (isAuthenticated) {
    return <Redirect to="/home" />;
  }

  return (
    <>
      <Center margin="auto" style={{ height: "100%" }}>
        <Button
          colorScheme="teal"
          variant="ghost"
          onClick={onOpen}
          margin="auto"
        >
          <Text fontSize="2xl" as="samp">
            Sungmin Market
          </Text>
        </Button>
      </Center>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">
              <Center>
                <Text fontSize="2xl" as="samp">
                  Sungmin Market
                </Text>
              </Center>
            </DrawerHeader>
            <DrawerBody>
              <Stack spacing={8}>
                <Button
                  colorScheme="green"
                  variant="link"
                  onClick={() => setSignInModal(true)}
                  size="lg"
                >
                  <Text isTruncated as="samp" fontSize="xl" color="teal">
                    Sign in
                  </Text>
                </Button>
                <Button
                  colorScheme="green"
                  variant="link"
                  onClick={() => setSignUpModal(true)}
                  size="lg"
                >
                  <Text isTruncated as="samp" fontSize="xl" color="teal">
                    Sign up
                  </Text>
                </Button>
              </Stack>
              <Modal
                size="sm"
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={signInModal}
                onClose={() => setSignInModal(false)}
              >
                {/* Sign in modal */}
                <SignIn />
              </Modal>
              <Modal
                size="sm"
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={signUpModal}
                onClose={() => setSignUpModal(false)}
              >
                {/* sign out modal */}
                <SignUp />
              </Modal>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(Landing);
