import React, { useEffect } from 'react';
import { getPosts } from '../../redux/action/post';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';
import './Posts.css';
const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, []);
  return loading ? (
    <div className="spinner-container">
      <Spinner
        size="xl"
        thickness="5px"
        speed="0.65s"
        emptyColor="#E2E8F0"
        color="#90CDF4"
      />
    </div>
  ) : (
    <div className="posts-body-container">
      <h1 className="posts-heading-primary">
        <span className="posts-heading-primary-main">Kreamin Studio</span>
      </h1>

      <div className="posts-container">
        {posts.map((post) => (
          <Link key={post.postId} to={`/post/${post.postId}`}>
            <div className="hover-post">
              <figure className="flex-item">
                <img src={post.img} className="posts-image" alt="images" />
              </figure>
              <span className="posts-title">{post.title}</span>
              <br />
              <span className="price">CAD${post.price}.00</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
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
