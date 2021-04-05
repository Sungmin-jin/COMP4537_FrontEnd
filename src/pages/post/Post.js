import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost } from '../../redux/action/post';
import './Post.css';
import theme from '../../utils/theme';
import CommentForm from '../../components/comment/CommentForm';
import CommentSection from '../../components/comment/CommentSection';
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
        <GridItem rowSpan={2} colSpan={{ base: 5, sm: 5, lg: 2 }}>
          <Grid h='100%' templateRows='repeat(5, 1fr)' gap={4}>
            <GridItem colSpan={4} bg='tomato'>
              <Heading size='2xl' as='samp' colorScheme='teal'>
                {post.title}
              </Heading>
            </GridItem>
            <GridItem colSpan={4} bg='tomato'>
              <Stack>
                <Text fontSize='lg' as='samp' colorScheme='teal'>
                  {post.date}
                </Text>
              </Stack>
            </GridItem>
            <GridItem colSpan={4} bg='tomato' />
          </Grid>
          {/* 
          <Stack>
            
            <Divider orientation="horizontal" colorScheme="teal" size="v1" />
            <Text fontSize="lg" as="samp" colorScheme="teal">
              {post.name}
            </Text>
          </Stack>

          <br></br>
          <Text fontSize='2xl' as='samp' colorScheme='teal'>
            {post.price}
          </Text> */}

          {/* <Text fontSize="2xl" as="samp" colorScheme="teal">
            {post.text}
          </Text> */}
        </GridItem>
        <GridItem rowSpan={1} colSpan={{ base: 5, sm: 5, lg: 2 }}>
          {/* <CommentSection id={match.params.id} /> */}
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
