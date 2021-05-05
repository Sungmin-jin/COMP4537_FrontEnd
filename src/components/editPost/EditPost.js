import React, { useRef, useState } from 'react';
import {
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Switch,
} from '@chakra-ui/react';

import { connect } from 'react-redux';
import { editPost } from '../../redux/action/post';
import { AiFillCamera } from 'react-icons/ai';
import './EditPost.css';

const EditPost = ({ onClose, editPost, post }) => {
  const [src, setSrc] = useState(post.img);
  const [formData, setFormData] = useState({
    text: post.text,
    title: post.title,
    price: post.price,
    image: post.img,
    isSold: post.isSold === 0 ? true : false,
  });
  const [file, setFile] = useState(null);
  const imageRef = useRef(null);

  const onImageClick = (e) => {
    e.preventDefault();
    imageRef.current.click();
  };
  console.log(formData.isSold);
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
        <ModalHeader>
          <div className="edit-post-title">
            <span className="font-style-editpost">Edit Your Post</span>
          </div>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb="3">
            <FormLabel>
              <span className="font-style-editpost">Title</span>
            </FormLabel>
            <Input
              value={formData.title}
              name="title"
              variant="flushed"
              focusBorderColor="#9bcaeb"
              onChange={onChange}
              required
            />
          </FormControl>
          <FormControl mb="3">
            <FormLabel>
              <span className="font-style-editpost">Price</span>
            </FormLabel>
            <Input
              required
              value={formData.price}
              type="number"
              name="price"
              focusBorderColor="#9bcaeb"
              variant="flushed"
              onChange={onChange}
            />
          </FormControl>
          <FormControl mb="5">
            <FormLabel>
              <span className="font-style-editpost">About your Item</span>
            </FormLabel>
            <Input
              required
              value={formData.text}
              name="text"
              focusBorderColor="#9bcaeb"
              onChange={onChange}
              variant="flushed"
            />
          </FormControl>
          <div className="is-it-sold-out">
            <span className="font-style-editpost">Is it Sold Out?</span>
            <br />
            <Switch
              size="lg"
              color="#9bcaeb"
              mx="3"
              defaultChecked={formData.isSold}
              onChange={(e) =>
                setFormData({ ...formData, isSold: e.target.checked })
              }
            />
          </div>
          {src && (
            <figure className="editpost-image">
              <img src={src} alt="editpostImage" />
            </figure>
          )}
          <div className="editpost-footer">
            <div className="edit-post-flex-item">
              <input
                type="file"
                accept="image/x-png,image/jpeg"
                style={{ display: 'none' }}
                ref={imageRef}
                onChange={onFileChange}
              />
              <div className="camera-icon">
                <AiFillCamera
                  color="#9bcaeb"
                  size={30}
                  onClick={onImageClick}
                />
              </div>
            </div>
            <div className="edit-post-flex-item">
              <button type="submit">
                <span className="font-style-editpost">Save</span>
              </button>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </form>
  );
};

export default connect(null, { editPost })(EditPost);
