import React, { useEffect, useState } from 'react';
import {
  getComments,
  deleteComment,
  editComment,
} from '../../redux/action/comment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Comment.css';
import { Modal, ModalOverlay, ModalContent } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import moment from 'moment';

const CommentSection = ({
  id,
  comments,
  getComments,
  deleteComment,
  Button,
}) => {
  useEffect(() => {
    getComments(id);
  }, []);

  const onDeleteClick = (id) => {
    deleteComment(id);
  };

  const [show, setShow] = useState(false);

  return (
    <>
      <div id='commentSection'>
        {comments &&
          comments.map((comment) => (
            <div key={comment.commentId} className='commentSection'>
              <div>{comment.name}</div>
              <div className='commentText'>{comment.commentText}</div>
              <div className='commentBottom'>
                <span>
                  {moment(
                    moment(comment.commentDate).add(-7, 'hour').format()
                  ).fromNow()}
                </span>
                <EditIcon color='teal' mr='1' />
                <DeleteIcon color='teal' onClick={(e) => setShow(true)} />
              </div>
            </div>
          ))}
      </div>
      <Modal isOpen={show} onClose={(e) => setShow(false)}>
        <ModalOverlay />
        <ModalContent>
          <Button color='da'>Delete</Button>
          <Button>Cancel</Button>
        </ModalContent>
      </Modal>
    </>
  );
};

CommentSection.propTypes = {
  getComments: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  comments: state.comments.comments,
});

export default connect(mapStateToProps, {
  getComments,
  deleteComment,
  editComment,
})(CommentSection);
