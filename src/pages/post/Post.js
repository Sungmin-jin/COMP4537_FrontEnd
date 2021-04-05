import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost } from '../../redux/action/post';
import './Post.css';
import theme from '../../utils/theme';
import CommentForm from '../../components/comment/CommentForm';
import {
  Text,
  Button,
  Spinner,
  Center,
  Stack,
  Grid,
  Divider,
  Heading,
  GridItem,
  extendTheme,
  Container,
  useDisclosure,
} from '@chakra-ui/react';

const Post = ({ getPost, match, user, post, loading }) => {
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
        templateRows='repeat(4, 1fr)'
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
        <GridItem rowSpan={1} colSpan={{ base: 5, sm: 5, lg: 2 }} bg='tomato'>
          <Heading size='2xl' as='samp' colorScheme='teal'>
            {post.title}
          </Heading>
          <br></br>
          <Stack>
            <Text fontSize='lg' as='samp' colorScheme='teal'>
              {post.date}
            </Text>
            <Divider orientation='horizontal' colorScheme='teal' />
            <Text fontSize='lg' as='samp' colorScheme='teal'>
              {post.name}
            </Text>
          </Stack>

          <br></br>
          <Text fontSize='2xl' as='samp' colorScheme='teal'>
            {post.price}
          </Text>

          {/* <Text fontSize="2xl" as="samp" colorScheme="teal">
            {post.text}
          </Text> */}
        </GridItem>
        <GridItem
          rowSpan={1}
          colSpan={{ base: 5, sm: 5, lg: 2 }}
          bg='papayawhip'
        />
        <GridItem rowSpan={1} colSpan={{ base: 5, sm: 5, lg: 2 }} bg='tomato' />
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
