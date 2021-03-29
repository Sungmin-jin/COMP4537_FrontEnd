import React from "react";
import {
  Text,
  Grid,
  GridItem,
  Center,
  Button,
  Stack,
  Box,
  Flex,
  Spacer,
  AddIcon,
  ExternalLinkIcon,
  EditIcon,
  RepeatIcon,
  Container,
  Heading,
} from "@chakra-ui/react";

const Dashboard = () => {
  return (
    <>
      <Grid templateColumns="repeat(6, 1fr)" gap={4}>
        <GridItem colStart={3} colEnd={5} p={20}>
          <Center>
            <Text fontSize="2xl" as="samp">
              Sungmin Market
            </Text>
          </Center>
        </GridItem>
        <GridItem colStart={3} colEnd={5} p={15}>
          <Stack spacing={5}>
            <Container>
              <Center>
                <Text fontSize="6xl" as="em">
                  Hello!
                </Text>
              </Center>
              <Center>
                <Text color="gray.500" isTruncated>
                  Welcome to Sungmin Market!
                </Text>
              </Center>
            </Container>
          </Stack>
        </GridItem>
      </Grid>
    </>
  );
};

export default Dashboard;
