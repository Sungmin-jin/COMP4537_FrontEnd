import React, { useRef, useState, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Icon,
} from '@chakra-ui/react';

import { FiFile } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
import './PostForm.css';
import axios from 'axios';

const PostForm = () => {
  const defaultBtn = useRef(null);
  const wrapperRef = useRef(null);
  const cancelBtn = useRef(null);

  const [src, setSrc] = useState();
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    price: '',
    image: '',
  });
  const defaultChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        const result = reader.result;
        setSrc(result);
        setFormData({ ...formData, image: file });
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
    console.log(formData);
    let data = new FormData();
    data.append('image', formData.image);
    const res = await axios.post(
      'http://localhost:5000/api/posts/image/34',
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    console.log(res);
  };
  const [newsrc, setNew] = useState();

  useEffect(async () => {
    const res = await axios.get('http://localhost:5000/api/posts/image');
    console.log(res);
    setNew(URL.createObjectURL(res.data));
  }, []);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <>
      <img src={newsrc} alt='' />
      <form onSubmit={onSubmit}>
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
    </>
  );
};

export default PostForm;
