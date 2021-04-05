import React, { useRef, useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Icon,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { FiFile } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
import './PostForm.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { uploadPost } from '../../redux/action/post';

const PostForm = ({ uploadPost }) => {
  const history = useHistory();
  const defaultBtn = useRef(null);
  const wrapperRef = useRef(null);
  const cancelBtn = useRef(null);

  const [src, setSrc] = useState();
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    price: '',
    file: '',
  });
  const defaultChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        const result = reader.result;
        setSrc(result);
        setFormData({ ...formData, file: file });
        wrapperRef.current.className += ' active';
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    defaultBtn.current.click();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    uploadPost(formData);
    history.push('/posts');
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className='whole-thing'>
      <form id='post-form' onSubmit={onSubmit}>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            placeholder='title'
            name='title'
            value={formData.title}
            onChange={onChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>About your item</FormLabel>
          <Textarea
            placeholder='Tell us about your item'
            name='text'
            value={formData.text}
            onChange={onChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Price</FormLabel>
          <Input
            placeholder='price'
            type='number'
            min='0'
            name='price'
            value={formData.price}
            onChange={onChange}
          />
        </FormControl>
        <FormControl>
          <div className='fileContainer'>
            <div className='wrapper' ref={wrapperRef}>
              <div className='image'>
                <img src={src} alt='' />
              </div>
              <div className='content'>
                <div className='icon'>
                  <Icon as={FiFile} />
                </div>
                <div className='text'>No file chosen, yet!</div>
              </div>
              <div
                id='cancel-btn'
                ref={cancelBtn}
                onClick={() => setSrc(undefined)}
              >
                <Icon as={AiOutlineClose} />
              </div>
              {/* <div className='file-name'>File name here</div> */}
            </div>
            <input
              type='file'
              id='default-btn'
              name='image'
              //   value={formData.image}
              onChange={(e) => {
                defaultChange(e);
              }}
              ref={defaultBtn}
              //   style={{ display: 'none' }}
              hidden
            />
            <button id='custom-btn' onClick={(e) => handleClick(e)}>
              Choose a file
            </button>
          </div>
        </FormControl>
        <Button colorScheme='teal' type='submit' mt='5'>
          Submit
        </Button>
      </form>
    </div>
  );
};

PostForm.propTypes = {
  uploadPost: PropTypes.func.isRequired,
};

export default connect(null, { uploadPost })(PostForm);
