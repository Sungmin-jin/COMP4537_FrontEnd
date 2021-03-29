import { React, useState, useRef } from 'react';
import {
  Center,
  Grid,
  GridItem,
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
const Landing = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [signInModal, setSignInModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  const initialRef = useRef();
  const finalRef = useRef();
  return (
    <>
      <Grid
        h='00px'
        templateRows='repeat(3, 1fr)'
        templateColumns='repeat(3, 1fr)'
        gap={4}
        bg='blue'
      >
        <GridItem colSpan={1} rowSpan={1} rowStart={2} colStart={2}>
          <Center h='100px' color='white'>
            <Button colorScheme='teal' variant='ghost' onClick={onOpen}>
              Sungmin market
            </Button>
            <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
              <DrawerOverlay>
                <DrawerContent>
                  <DrawerHeader borderBottomWidth='1px'>
                    Sungmin Market
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

export default Landing;
