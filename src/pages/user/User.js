import React, { useEffect, useState } from 'react';
import { getMyPosts } from '../../redux/action/post';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deletePost } from '../../redux/action/post';
import '../post/Post.css';
import EditPost from '../../components/editPost/EditPost';

import { Modal } from '@chakra-ui/react';
import './User.css';
const User = ({ getMyPosts, user, post: { posts }, deletePost }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  useEffect(() => {
    getMyPosts();
  }, []);

  return (
    <>
      <div className="user-container">
        <div className="user-heading-primary">
          <span className="user-heading-primary-main">Kreamin Studio</span>
        </div>

        <div className="user-information-panel">
          <div className="info-1">
            <span>{user && user.name}</span>
          </div>
          <div className="info-2">
            <span>
              <span className="text-display">Email: </span>
              <span className="font-style">{user && user.email}</span>
            </span>
          </div>
          <div className="info-3">
            <span>
              # of Posts: <span className="font-style">{posts.length}</span>
            </span>
          </div>
          <div className="info-4">
            <Link to="/chatList">
              <span className="font-style"> Chat list</span>
            </Link>
          </div>
        </div>
        <div className="hr-line">
          <hr />
        </div>
        <div className="user-posts-container">
          {posts.map((post) => (
            <div className="user-post-hover">
              <span className="user-post-title">{post.title}</span>
              <Link key={post.postId} to={`/post/${post.postId}`}>
                <figure>
                  <img className="user-post-image " src={post.img} />
                </figure>
              </Link>

              <div className="user-post-edit-delete-group">
                <button
                  className="user-btn edit-btn"
                  onClick={(e) => {
                    onOpen();
                    setSelectedPost(post);
                  }}
                >
                  <span className="font-style">Edit</span>
                </button>
                <button
                  className="user-btn delete-btn"
                  onClick={(e) => deletePost(post.postId, post.img)}
                >
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <EditPost onClose={onClose} post={selectedPost} />
      </Modal>
    </>
  );
};

User.propTypes = {
  getMyPosts: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  post: state.post,
});
export default connect(mapStateToProps, { getMyPosts, deletePost })(User);
