import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPost } from "../../redux/action/post";
import "./Post.css";
import theme from "../../utils/theme";
import moment from "moment-timezone";
import CommentForm from "../../components/comment/CommentForm";
import CommentSection from "../../components/comment/CommentSection";
import {
  Text,
  Button,
  Spinner,
  Center,
  Heading,
  Grid,
  Stack,
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
          <Grid>
            <GridItem pl={5} pt={10} pb={20}>
              <Heading size="xl" as="samp" colorScheme="teal">
                {/* {post.title} */}
                Sungmin Jin's shirt
              </Heading>
            </GridItem>
            <GridItem pl={5} pt={3} pb={10}>
              <Text fontSize="lg" as="samp" colorScheme="teal">
                {moment(moment(post.date).add(-7, "hour").format()).fromNow()}
              </Text>
              <Divider />
              <Text fontSize="lg" as="samp" colorScheme="teal">
                {post.name}
              </Text>
            </GridItem>
            <GridItem overflowy="scroll" pl={5} pt={3} pb={10}>
              <Text fontSize="lg" as="samp" colorScheme="teal">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed est
                neque, vestibulum a odio ac, ullamcorper imperdiet risus.
                Integer augue dui, scelerisque vitae feugiat et, mollis nec
                massa. Pellentesque iaculis enim non sem imperdiet aliquet.
                Curabitur viverra nisl non justo sollicitudin, non molestie eros
                iaculis. Nulla facilisi. Cras posuere vitae enim fermentum
                rutrum. Duis lacinia neque quis finibus ullamcorper.
              </Text>
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem
          rowSpan={1}
          colSpan={{ base: 5, sm: 5, lg: 2 }}
          overflowy="scroll"
        >
          <CommentSection id={match.params.id} />
        </GridItem>
      </Grid>
      <CommentForm id={match.params.id} />
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
