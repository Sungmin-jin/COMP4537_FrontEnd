import React, { useEffect } from 'react';
import { getComments } from '../../redux/action/comment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Comment.css';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import momentTimeZone from 'moment-timezone';
import moment from 'moment';

const CommentSection = ({ id, comments, getComments }) => {
  useEffect(() => {
    getComments(id);
  }, []);

  //   const toPST ()

  return (
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
              <DeleteIcon color='teal' />
            </div>
          </div>
        ))}
    </div>
  );
};

CommentSection.propTypes = {
  getComments: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  comments: state.comments.comments,
});

export default connect(mapStateToProps, { getComments })(CommentSection);
