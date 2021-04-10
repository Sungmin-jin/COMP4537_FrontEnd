import React, { useEffect } from "react";
import { getPosts } from "../../redux/action/post";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  Button,
  Container,
  SimpleGrid,
  Box,
  Text,
  Image,
  Spinner,
  Center,
  Wrap,
  WrapItem,
  useDisclosure,
} from "@chakra-ui/react";
const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, []);
  return loading ? (
    <Center height="100%">
      <Spinner
        size="xl"
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="teal"
      />
    </Center>
  ) : (
    <Container margin="auto" style={{ height: "100%" }}>
      <Center pt={100} pb={10} margin="auto">
        <Button p={10} colorScheme="teal" variant="ghost" margin="auto">
          <Link to="/home">
            <Text fontSize="2xl" as="samp" color="teal">
              Krēamin
            </Text>
          </Link>
        </Button>
      </Center>
      <Wrap>
        <WrapItem>
          <SimpleGrid columns={{ sm: 2, md: 3 }}>
            {posts.map((post) => (
              <Link key={post.postId} to={`/post/${post.postId}`}>
                <Box>
                  <Image src={post.img} />
                </Box>
              </Link>
            ))}
          </SimpleGrid>
        </WrapItem>
      </Wrap>
    </Container>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
