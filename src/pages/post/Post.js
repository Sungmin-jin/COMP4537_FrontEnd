import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPost } from "../../redux/action/post";
import "./Post.css";
import moment from "moment-timezone";
import theme from "../../utils/theme";
import {
  Text,
  Button,
  Spinner,
  Center,
  Grid,
  Divider,
  GridItem,
  Container,
  useDisclosure,
} from "@chakra-ui/react";

const Post = ({ getPost, match, user, post, loading }) => {
  const { onToggle } = useDisclosure();

  useEffect(() => {
    getPost(match.params.id);
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
        templateRows="repeat(3, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={4}
      >
        <GridItem
          rowSpan={{ base: 1, sm: 1, lg: 3 }}
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
        <GridItem rowSpan={2} colSpan={{ base: 5, sm: 5, lg: 2 }}>
          <Grid h="30px" templateRows="repeat(3, 1fr)">
            <GridItem pl={5} pt={10} pb={10}>
              <Text fontSize="3xl" as="samp" colorScheme="teal">
                {post.title}
              </Text>
            </GridItem>
            <GridItem pl={5} pt={3} pb={3}>
              <Text fontSize="lg" as="samp" colorScheme="teal">
                {moment(moment(post.date).add(-7, "hour").format()).fromNow()}
              </Text>
              <Divider />
              <Text fontSize="lg" as="samp" colorScheme="teal">
                {post.name}
              </Text>
            </GridItem>
            <GridItem p={5}>
              <Text fontSize="2xl" as="samp" colorScheme="teal">
                {/* post.text */}
                add post.text Lorem ipsum dolor sit amet, consectetur adipiscing
                elit. Nam metus nulla, ultricies vitae pellentesque vel,
                elementum nec est. Ut congue dictum dapibus. Vivamus eget
                sagittis felis, ac semper ipsum. Ut tincidunt
              </Text>
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem rowSpan={1} colSpan={{ base: 5, sm: 5, lg: 2 }} bg="tomato">
          asdfasdf
        </GridItem>
        Bottom of the page
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
