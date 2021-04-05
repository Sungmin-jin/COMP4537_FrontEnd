import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost } from '../../redux/action/post';
import './Post.css';

import { Spinner, Center, Grid, GridItem, Container } from '@chakra-ui/react';

const Post = ({ getPost, match, user, post, loading }) => {
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
    <div>
      <Container maxW='container.xl'>
        <Grid
          h='500px'
          templateRows='repeat(3, 1fr)'
          templateColumns='repeat(5, 1fr)'
          gap={4}
        >
          <GridItem rowSpan={3} colSpan={3}>
            <Center>
              <img
                src={post.img}
                height='100%'
                width='100%'
                className='img-thumbnail'
              />
            </Center>
          </GridItem>
          <GridItem rowspan={1} colSpan={2} bg='tomato' />
          <GridItem rowspan={1} colSpan={2} bg='papayawhip' />
          <GridItem rowspan={1} colSpan={2} bg='tomato' />
        </Grid>
      </Container>
    </div>
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
