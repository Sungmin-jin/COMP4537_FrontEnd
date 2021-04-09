import React, { useEffect } from "react";
import { getMyPosts } from "../../redux/action/post";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../post/Post.css";

import moment from "moment-timezone";
import {
  Container,
  Center,
  Button,
  Grid,
  Wrap,
  Flex,
  WrapItem,
  GridItem,
  Text,
  Image,
  Box,
  Divider,
  Heading,
  Spacer,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
const User = ({ getMyPosts, user, post: { posts } }) => {
  useEffect(() => {
    getMyPosts();
  }, []);

  return (
    <>
      {console.log(posts)}
      <Container maxW="container.xl" margin="auto" style={{ height: "100%" }}>
        <Grid
          h="100%"
          templateRows="repeat(3, 1fr)"
          templateColumns="repeat(5, 1fr)"
        >
          <GridItem rowSpan={1} colSpan={5} bg="white">
            <Center p={10}>
              <Button colorScheme="teal" variant="ghost" margin="auto">
                <Text fontSize="2xl" as="samp" colorScheme="teal">
                  Sungmin Market
                </Text>
              </Button>
            </Center>
            <Stack p={10}>
              <Text fontSize="5xl" as="samp" colorScheme="teal">
                {user && user.name}
              </Text>
              <div style={{ width: "20em" }}>
                <Divider />
              </div>
              <Text fontSize="lg" as="samp" colorScheme="teal">
                email: {user && user.email}
              </Text>
              <Text fontSize="lg" as="samp" colorScheme="teal">
                # of Posts: {posts.length}
              </Text>
            </Stack>
          </GridItem>

          <GridItem rowSpan={2} colSpan={5} bg="white">
            <SimpleGrid columns={{ sm: 1, md: 1, lg: 2 }} pt={5}>
              {posts.map((post) => (
                <Center>
                  <Stack>
                    <Flex>
                      <Text fontSize="lg" as="samp" colorScheme="teal">
                        {post.title}
                      </Text>
                      <Spacer />
                      <Text fontSize="lg" as="samp" colorScheme="teal">
                        {moment(
                          moment(post.date).add(-7, "hour").format()
                        ).fromNow()}
                      </Text>
                    </Flex>
                    <Link key={post.postId} to={`/post/${post.postId}`}>
                      <Box>
                        <Image boxSize="500px" align="center" src={post.img} />
                      </Box>
                    </Link>
                    <Flex>
                      <Spacer />
                      <Button
                        size="xs"
                        colorScheme="teal"
                        variant="ghost"
                        margin="auto"
                      >
                        <Text fontSize="lg" as="samp" colorScheme="teal">
                          EDIT
                        </Text>
                      </Button>
                      <Button
                        size="xs"
                        colorScheme="pink"
                        variant="ghost"
                        margin="auto"
                      >
                        <Text fontSize="lg" as="samp">
                          DELETE
                        </Text>
                      </Button>
                    </Flex>
                  </Stack>
                </Center>
                // </Link>
              ))}
            </SimpleGrid>
          </GridItem>
        </Grid>
      </Container>
      {console.log(posts)}
    </>
  );
};

User.propTypes = {
  getMyPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  post: state.post,
});
export default connect(mapStateToProps, { getMyPosts })(User);
