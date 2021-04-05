import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPost } from "../../redux/action/post";
import "./Post.css";

import {
  Text,
  Button,
  Spinner,
  Center,
  Grid,
  Heading,
  GridItem,
  Container,
  useDisclosure,
} from "@chakra-ui/react";

const Post = ({ getPost, match, user, post, loading }) => {
  const { onToggle } = useDisclosure();
  useEffect(() => {
    getPost(match.params.id);
  }, []);

  console.log(post);
  return loading ? (
    <Center height="100%">
      <Spinner
        size="xl"
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
      />
    </Center>
  ) : (
    <Container maxW="container.xl" margin="auto" style={{ height: "100%" }}>
      <Center p={10}>
        <Button
          p={10}
          colorScheme="teal"
          variant="ghost"
          onClick={onToggle}
          margin="auto"
        >
          <Text fontSize="2xl" as="samp" colorScheme="teal">
            Sungmin Market
          </Text>
        </Button>
      </Center>

      <Grid
        templateRows="repeat(5, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={4}
      >
        <GridItem
          rowSpan={{ base: 2, sm: 2, lg: 3 }}
          colSpan={{ base: 5, sm: 5, lg: 3 }}
        >
          <Center>
            <img
              src={post.img}
              height="100%"
              width="100%"
              className="img-thumbnail"
            />
          </Center>
        </GridItem>
        <GridItem rowSpan={1} colSpan={{ base: 5, sm: 5, lg: 2 }} bg="tomato">
          <Heading size="xl" as="samp" colorScheme="teal">
            {post.title}
          </Heading>
          <br></br>
          <Text fontSize="2xl" as="samp" colorScheme="teal">
            {post.text}
          </Text>
          <br></br>
          <Text fontSize="2xl" as="samp" colorScheme="teal">
            {post.date}
          </Text>
          <br></br>
          <Text fontSize="2xl" as="samp" colorScheme="teal">
            {post.price}
          </Text>
        </GridItem>
        <GridItem
          rowSpan={1}
          colSpan={{ base: 5, sm: 5, lg: 2 }}
          bg="papayawhip"
        />
        <GridItem rowSpan={1} colSpan={{ base: 5, sm: 5, lg: 2 }} bg="tomato" />
      </Grid>
    </Container>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post.post,
  loading: state.post.loading,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getPost })(Post);
