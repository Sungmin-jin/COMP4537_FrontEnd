import React, { useEffect, useState } from 'react';
import { getMyPosts } from '../../redux/action/post';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deletePost } from '../../redux/action/post';
import '../post/Post.css';
import EditPost from '../../components/editPost/EditPost';

import { Modal } from '@chakra-ui/react';
import './User.css';

const User = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const {posts} = useSelector(state => state.post);
  
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  useEffect(() => {
    dispatch(getMyPosts());
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
            <div className="user-post-hover" key={post.postId}>
              <div className="user-post-title">
                <span className="user-post-title">{post.title}</span>
              </div>
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
                  onClick={(e) => dispatch(deletePost(post.postId, post.img))}
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

export default User;
