import React, { useEffect } from 'react';
import { getPosts } from '../../redux/action/post';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Posts = ({ getPosts }) => {
  useEffect(() => {
    console.log('hello');
    getPosts();
  }, []);
  return (
    <div>
      <div>post</div>
    </div>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
};

export default connect(null, { getPosts })(Posts);
