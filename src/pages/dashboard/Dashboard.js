import React, { useEffect } from "react";
import { logout } from "../../redux/action/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Link,
  Text,
  Grid,
  GridItem,
  Center,
  Stack,
  Container,
} from "@chakra-ui/react";

const Dashboard = ({ logout, isAuthenticated }) => {
  // 2 bool values for login, and sign up
  useEffect(() => {
    // if (isAuthenticated){ toastsadkflasdf}
    console.log(isAuthenticated);
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    logout();
  };
  return (
    <>
      <form onSubmit={(e) => onSubmit(e)}>
        <Grid templateColumns="repeat(7, 1fr)" gap={4}>
          <GridItem colStart={4} colSpan={1} p={10}>
            <Center>
              <Text fontSize="2xl" as="samp" color="teal">
                Sungmin Market
              </Text>
            </Center>
          </GridItem>
          <GridItem colStart={4} p={15}>
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
          <GridItem colStart={4} p={30}>
            <Center>
              <Grid templateColumns="repeat(2, 1fr)" gap={25}>
                <GridItem colSpan={2}>
                  <Link color="teal.500" href="#">
                    <Text isTruncated as="em" fontSize="lg">
                      View Item
                    </Text>
                  </Link>
                  <Link color="teal.500">
                    <Text isTruncated as="em" fontSize="lg">
                      Write Item
                    </Text>
                  </Link>
                </GridItem>
                <GridItem colSpan={2}>
                  <Container>
                    <Center>
                      <Link color="teal.500">
                        <Text
                          isTruncated
                          as="em"
                          fontSize="lg"
                          onClick={logout}
                        >
                          Sign Out
                        </Text>
                      </Link>
                    </Center>
                  </Container>
                </GridItem>
              </Grid>
            </Center>
          </GridItem>
        </Grid>
      </form>
    </>
  );
};
Dashboard.propTypes = {
  logout: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { logout })(Dashboard);
