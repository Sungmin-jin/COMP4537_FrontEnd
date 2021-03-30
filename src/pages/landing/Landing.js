import { React, useState, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Text,
  Center,
  Grid,
  GridItem,
  Spacer,
  Divider,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Modal,
} from '@chakra-ui/react';
//components
import SignIn from '../../components/signin/SignIn';
import SignUp from '../../components/signup/SignUp';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Landing = ({ isAuthenticated }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [signInModal, setSignInModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  const initialRef = useRef();
  const finalRef = useRef();
  if (isAuthenticated) {
    return <Redirect to='/home' />;
  }

  return (
    <>
      <Grid
        h='00px'
        templateRows='repeat(5, 1fr)'
        templateColumns='repeat(5, 1fr)'
        gap={40}
      >
        <GridItem colStart={3} rowStart={4}>
          <Center h='100px' color='white'>
            <Button colorScheme='teal' variant='ghost' onClick={onOpen}>
              <Text fontSize='2xl' as='samp'>
                Sungmin Market
              </Text>
            </Button>
            <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
              <DrawerOverlay>
                <DrawerContent>
                  <DrawerHeader borderBottomWidth='1px'>
                    <Text fontSize='2xl' as='samp'>
                      Sungmin Market
                    </Text>
                  </DrawerHeader>
                  <DrawerBody>
                    <br></br>
                    <Button
                      colorScheme='green'
                      variant='link'
                      onClick={() => setSignInModal(true)}
                      size='lg'
                    >
                      Sign in
                    </Button>
                    <Modal
                      size='sm'
                      initialFocusRef={initialRef}
                      finalFocusRef={finalRef}
                      isOpen={signInModal}
                      onClose={() => setSignInModal(false)}
                    >
                      {/* Sign in modal */}
                      <SignIn />
                    </Modal>
                    <br></br>
                    <br></br>
                    <Divider />
                    <br></br>
                    <Button
                      colorScheme='green'
                      variant='link'
                      onClick={() => setSignUpModal(true)}
                      size='lg'
                    >
                      Sign up
                    </Button>
                    <Modal
                      size='xl'
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
          </Center>
        </GridItem>
      </Grid>
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
