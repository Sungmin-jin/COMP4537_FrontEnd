import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost } from '../../redux/action/post';
import './Post.css';
import moment from 'moment-timezone';
import CommentForm from '../../components/comment/CommentForm';
import CommentSection from '../../components/comment/CommentSection';
import {
  Text,
  Button,
  Spinner,
  Center,
  Heading,
  Grid,
  Divider,
  GridItem,
  Container,
  useDisclosure,
} from '@chakra-ui/react';

const Post = ({ getPost, match, post, loading }) => {
  const { onToggle } = useDisclosure();

  useEffect(() => {
    getPost(match.params.id);
  }, []);

  return loading ? (
    <Center height='100%'>
      <Spinner
        size='xl'
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
      />
    </Center>
  ) : (
    <Container maxW='container.xl' margin='auto' style={{ height: '100%' }}>
      <Center p={10}>
        <Button
          p={10}
          colorScheme='teal'
          variant='ghost'
          onClick={onToggle}
          margin='auto'
        >
          <Text fontSize='2xl' as='samp' colorScheme='teal'>
            Sungmin Market
          </Text>
        </Button>
      </Center>

      <Grid
        templateRows='repeat(3, 1fr)'
        templateColumns='repeat(5, 1fr)'
        gap={4}
      >
        <GridItem
          rowSpan={{ base: 1, sm: 1, lg: 3 }}
          colSpan={{ base: 5, sm: 5, lg: 3 }}
        >
          <Center>
            <img
              src={post.img}
              height='100%'
              width='100%'
              className='img-thumbnail'
            />
          </Center>
        </GridItem>
        <GridItem rowSpan={3} colSpan={{ base: 5, sm: 5, lg: 2 }}>
          <Grid>
            <GridItem pl={5} pt={10} pb={20}>
              <Heading size='xl' as='samp' colorScheme='teal'>
                {/* {post.title} */}
                Sungmin Jin's shirt
              </Heading>
            </GridItem>
            <GridItem pl={5} pt={3} pb={10}>
              <Text fontSize='lg' as='samp' colorScheme='teal'>
                {moment(moment(post.date).add(-7, 'hour').format()).fromNow()}
              </Text>
              <Divider />
              <Text fontSize='lg' as='samp' colorScheme='teal'>
                {post.name}
              </Text>
            </GridItem>
            <GridItem overflowy='scroll' pl={5} pt={3} pb={10}>
              <Text fontSize='lg' as='samp' colorScheme='teal'>
                {post.text}
              </Text>
            </GridItem>
          </Grid>
          <CommentSection id={match.params.id} />

          <CommentForm id={match.params.id} />
        </GridItem>
      </Grid>
    </Container>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post.post,
  loading: state.post.loading,
});

export default connect(mapStateToProps, { getPost })(Post);
