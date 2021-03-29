import { React, useState, useEffect } from "react";
import {
  Text,
  Center,
  Grid,
  GridItem,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

const Landing = () => {
  const [placement, setPlacement] = useState("left");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Grid
        h="00px"
        templateRows="repeat(3, 1fr)"
        templateColumns="repeat(3, 1fr)"
        gap={4}
        bg="blue"
      >
        <GridItem colSpan={1} rowSpan={1} rowStart={2} colStart={2}>
          <Center h="100px" color="white">
            <Button colorScheme="teal" variant="ghost" onClick={onOpen}>
              Sungmin market
            </Button>
            <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
              <DrawerOverlay>
                <DrawerContent>
                  <DrawerHeader borderBottomWidth="1px">
                    Sungmin Market
                  </DrawerHeader>
                  <DrawerBody>
                    <br></br>
                    <Button
                      colorScheme="green"
                      variant="link"
                      onClick={onOpen}
                      size="lg"
                    >
                      Sign in
                    </Button>
                    <br></br>
                    <br></br>
                    <br></br>
                    <Button
                      colorScheme="green"
                      variant="link"
                      onClick={onOpen}
                      size="lg"
                    >
                      Sign up
                    </Button>
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
