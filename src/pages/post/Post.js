import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost } from '../../redux/action/post';
import './Post.css';
import moment from 'moment-timezone';
import CommentForm from '../../components/comment/CommentForm';
import CommentSection from '../../components/comment/CommentSection';
import { Spinner } from '@chakra-ui/react';

const Post = ({ getPost, match, post, loading }) => {
  useEffect(() => {
    getPost(match.params.id);
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
    <div className="post-body-container">
      <h1 className="posts-heading-primary">
        <span className="posts-heading-primary-main">Kreamin Studio</span>
      </h1>

      <div className="post-container">
        <div className="grid-container">
          <div className="post-image-container">
            <img src={post.img} className="img-thumbnail" alt="postImage" />
          </div>
          <div className="post-detail-container">
            <div className="post-detail-header">
              <span className="post-title">{post.title}</span>
            </div>
            <div className="post-detail-contents">
              <span>
                {post.isSold === 1 ? (
                  <span className="span-unavailable unavailable">
                    NOT AVAILABLE
                  </span>
                ) : (
                  <span className="span-available available">available</span>
                )}
              </span>
              <span className="post-date">
                {moment(
                  moment(post.postDate).add(-7, 'hour').format()
                ).fromNow()}
              </span>
              <hr />
            </div>
            <div className="post-detail-contents">
              <div className="post-owner">
                Posted By: <span> {post.name}</span>
              </div>
              <div className="post-text">
                <span>{post.text}</span>
              </div>
            </div>
          </div>
          <div className="post-comment-container">
            <CommentSection id={match.params.id} />

            <CommentForm id={match.params.id} />
          </div>
        </div>
      </div>
    </div>
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
