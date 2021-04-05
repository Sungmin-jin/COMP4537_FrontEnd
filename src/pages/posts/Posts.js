import React, { useEffect } from "react";
import { getPosts } from "../../redux/action/post";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Landing from "../dashboard/Dashboard";
import {
  Slide,
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
import { AddIcon } from "@chakra-ui/icons";
const Posts = ({ getPosts, post: { posts, loading } }) => {
  const { isOpen, onToggle } = useDisclosure();
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
        color="blue.500"
      />
    </Center>
  ) : (
    <Container margin="auto" style={{ height: "100%" }}>
      <Center pt={100} pb={10} margin="auto">
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
        <Slide direction="bottom" in={isOpen} style={{ zIndex: 10 }}>
          <Box
            p="40px"
            color="white"
            mt="4"
            bg="teal.500"
            rounded="md"
            shadow="md"
          >
            <Text fontSize="2xl" as="samp" colorScheme="white">
              Welcome to Sungmin Market!
            </Text>
          </Box>
        </Slide>
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
