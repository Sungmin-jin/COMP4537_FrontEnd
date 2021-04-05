import React, { useEffect } from 'react';
import { getComments } from '../../redux/action/comment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, FromControl, FormLabel } from '@chakra-ui/react';
import './Comment.css';

const Comment = ({ id, getComments, comments }) => {
  useEffect(() => {
    getComments(id);
  }, []);
  return (
    <>
      <form action='' id='commentForm'>
        <input
          type='text'
          id='commentInput'
          placeholder='write your text here'
        />
        <button type='button' id='commentCancelBtn'>
          cancel
        </button>
        <button type='submit' id='commentSubmitBtn'>
          Submit
        </button>
      </form>
    </>
  );
};

Comment.propTypes = {
  getComments: PropTypes.func.isRequired,
  comments: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  comments: state.comments.comments,
});

export default connect(mapStateToProps, { getComments })(Comment);
