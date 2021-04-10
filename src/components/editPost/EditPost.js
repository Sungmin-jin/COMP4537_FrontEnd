import React, { useRef, useState } from 'react';
import {
  Button,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Switch,
  Center,
} from '@chakra-ui/react';

import { connect } from 'react-redux';
import { editPost } from '../../redux/action/post';
import { AiFillCamera } from 'react-icons/ai';

const EditPost = ({ onClose, editPost, post }) => {
  const [src, setSrc] = useState(post.img);
  const [formData, setFormData] = useState({
    text: post.text,
    title: post.title,
    price: post.price,
    image: post.img,
    isSold: post.isSold == 0 ? false : true,
  });
  const [file, setFile] = useState(null);
  const imageRef = useRef(null);

  const onImageClick = (e) => {
    e.preventDefault();
    imageRef.current.click();
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        setSrc(reader.result);
      };
      setFile(file);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    console.log(file);
    editPost(formData, post.postId, file);
    onClose();
  };

  return (
    <form onSubmit={onSubmit}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Your Post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb='3'>
            <FormLabel>Title</FormLabel>
            <Input
              value={formData.title}
              name='title'
              onChange={onChange}
              required
            />
          </FormControl>
          <FormControl mb='3'>
            <FormLabel>Price</FormLabel>
            <Input
              required
              value={formData.price}
              type='number'
              name='price'
              onChange={onChange}
            />
          </FormControl>
          <FormControl mb='5'>
            <FormLabel>About your Item</FormLabel>
            <Input
              required
              value={formData.text}
              name='text'
              onChange={onChange}
              required
            />
          </FormControl>
          <Center mb='3'>
            Is it Sold Out?
            <Switch
              size='lg'
              colorScheme='teal'
              mx='5'
              defaultChecked={formData.isSold}
              onChange={(e) =>
                setFormData({ ...formData, isSold: e.target.checked })
              }
            />
          </Center>
          {src && <img className='img-thumbnail' src={src} />}
        </ModalBody>
        <ModalFooter>
          <input
            type='file'
            accept='image/x-png,image/jpeg'
            style={{ visibility: 'hidden' }}
            ref={imageRef}
            onChange={onFileChange}
          />
          <AiFillCamera color='teal' size={45} onClick={onImageClick} />
          <Button colorScheme='linkedin' mx='1' onClick={onClose}>
            Cancel
          </Button>
          <Button type='submit' colorScheme='teal'>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </form>
  );
};

export default connect(null, { editPost })(EditPost);
