import React, { useEffect } from 'react';
import { getPosts } from '../../redux/action/post';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Container,
  SimpleGrid,
  Box,
  Image,
  Spinner,
  Center,
} from '@chakra-ui/react';
const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
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
    <Container>
      <SimpleGrid columns={{ sm: 2, md: 4 }}>
        {posts.map((post) => (
          <Link to={`/post/${post.postId}`}>
            <Box w='100%' h='80px' key={post.postId}>
              <Image src={post.img} />
            </Box>
          </Link>
        ))}
      </SimpleGrid>
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
