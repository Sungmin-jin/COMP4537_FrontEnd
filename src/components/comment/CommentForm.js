import React, { useState } from 'react';
import { uploadComment } from '../../redux/action/comment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Comment.css';

const CommentForm = ({ id, uploadComment }) => {
  const [formData, setFormData] = useState({
    text: '',
    postId: id,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    uploadComment(formData);
    setFormData({ ...formData, text: '' });
  };

  return (
    <div id='commentContainer'>
      <form action='' id='commentForm' onSubmit={onSubmit}>
        <input
          type='text'
          name='text'
          id='commentInput'
          value={formData.text}
          onChange={(e) => setFormData({ ...formData, text: e.target.value })}
          placeholder='write your text here'
        />
        <button
          type='button'
          id='commentCancelBtn'
          onClick={() => setFormData({ text: '' })}
        >
          cancel
        </button>
        <button type='submit' id='commentSubmitBtn'>
          Submit
        </button>
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  uploadComment: PropTypes.func.isRequired,
};

export default connect(null, { uploadComment })(CommentForm);
