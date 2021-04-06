import React, { useEffect, useState } from 'react';
import {
  getComments,
  deleteComment,
  editComment,
} from '../../redux/action/comment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Comment.css';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import moment from 'moment';
import {
  Box,
  Text,
  Grid,
  GridItem,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Input,
  Center,
} from '@chakra-ui/react';

const CommentSection = ({
  id,
  comments,
  getComments,
  deleteComment,
  editComment,
  user,
}) => {
  useEffect(() => {
    getComments(id);
  }, [editComment]);

  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [commentId, setCommentId] = useState();
  const [formData, setFormData] = useState({ text: '', id: '' });

  const onOpenDelete = () => {
    setShowDelete(true);
  };
  const onCloseDelete = () => {
    setShowDelete(false);
  };

  const onOpenEdit = () => {
    setShowEdit(true);
  };

  const onCloseEdit = () => {
    setShowEdit(false);
  };

  const onDeleteClick = () => {
    deleteComment(commentId);
    onCloseDelete();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    editComment(formData, id);
    onCloseEdit();
  };
  console.log(user);

  return (
    <>
      <div id='commentSection'>
        {comments &&
          comments.map((comment) => (
            <div key={comment.commentId}>
              <Box p={2} shadow='sm' borderWidth='1px'>
                <Grid
                  templateRows='repeat(1, 1fr)'
                  templateColumns='repeat(5, 1fr)'
                  gap={1}
                >
                  <GridItem colSpan={4} rowSpan={2} pl={2} pt={3}>
                    <Text fontSize='md' as='samp' colorScheme='teal'>
                      {comment.commentText}
                    </Text>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Text fontSize={10} as='samp' colorScheme='teal'>
                      {moment(
                        moment(comment.commentDate).add(-7, 'hour').format()
                      ).fromNow()}
                    </Text>
                  </GridItem>
                  <GridItem colSpan={1}>
                    {user.userId === comment.userId && (
                      <>
                        <EditIcon
                          color='teal'
                          mr='7'
                          onClick={(e) => {
                            onOpenEdit();
                            setFormData({
                              text: comment.commentText,
                              id: comment.commentId,
                            });
                          }}
                        />
                        <DeleteIcon
                          color='teal'
                          onClick={(e) => {
                            onOpenDelete();
                            setCommentId(comment.commentId);
                          }}
                        />
                      </>
                    )}
                  </GridItem>
                </Grid>
              </Box>
            </div>
          ))}
      </div>
      <Modal isOpen={showDelete} onClose={onCloseDelete}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody padding='5'>
            <Center>
              <Button mx='3' background='tomato' onClick={onDeleteClick}>
                Delete
              </Button>
              <Button onClick={onCloseDelete}>Cancel</Button>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={showEdit} onClose={onCloseEdit}>
        <ModalOverlay />
        <form onSubmit={(e) => onSubmit(e)}>
          <ModalContent>
            <ModalBody padding='5'>
              <Center>
                <Input
                  value={formData.text}
                  onChange={(e) =>
                    setFormData({ ...formData, text: e.target.value })
                  }
                />
              </Center>
            </ModalBody>
            <ModalFooter>
              <Button mr='3' background='teal' type='submit'>
                Save
              </Button>
              <Button onClick={onCloseEdit}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

CommentSection.propTypes = {
  getComments: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  comments: state.comments.comments,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  getComments,
  deleteComment,
  editComment,
})(CommentSection);
