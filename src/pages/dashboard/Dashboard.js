import React, { useEffect } from "react";
import { Link as ReachLink } from "react-router-dom";
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
      <form onSubmit={(e) => onSubmit(e)} style={{ height: "100%" }}>
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              height: "100%",
              width: "80%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              <div>
                <Center>
                  <Link to="/home">
                    <Text fontSize="3xl" as="samp" color="teal">
                      <span style={{ fontWeight: "bold" }}>Krēamin</span>
                    </Text>
                  </Link>
                </Center>
              </div>
              <div>
                <Center>
                  <Text fontSize="5xl" as="em">
                    Welcome
                  </Text>
                </Center>
              </div>
              <div>
                <Center>
                  <Text color="gray.500" as="i" isTruncated>
                    to Krēamin!
                  </Text>
                </Center>
              </div>
              <div>
                <div style={{ float: "left" }}>
                  <Link
                    color="teal.500"
                    href="#"
                    mr="1"
                    as={ReachLink}
                    to="/posts"
                  >
                    <Text isTruncated as="samp" fontSize="lg">
                      <span style={{ fontWeight: "bold" }}>View</span>
                    </Text>
                  </Link>
                </div>
                <div style={{ float: "right" }}>
                  <Link color="teal.500" as={ReachLink} ml="1" to="/postForm">
                    <Text isTruncated as="samp" fontSize="lg">
                      <span style={{ fontWeight: "bold" }}>Create</span>
                    </Text>
                  </Link>
                </div>
              </div>

              <div style={{ height: "100px" }}></div>
              <div>
                <Center>
                  <Link color="teal.500" as={ReachLink} ml="1" to="/user">
                    <Text isTruncated as="samp" fontSize="lg">
                      <span style={{ fontWeight: "bold" }}>Your Profile</span>
                    </Text>
                  </Link>
                </Center>
              </div>
              <div>
                <Center>
                  <Link color="teal.500">
                    <Text isTruncated as="em" fontSize="md" onClick={logout}>
                      <span style={{ fontWeight: "bold" }}>Sign Out</span>
                    </Text>
                  </Link>
                </Center>
              </div>
            </div>
          </div>
        </div>
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
