import React, { useEffect, useState } from "react";
import {
  getComments,
  deleteComment,
  editComment,
} from "../../redux/action/comment";
import { useDispatch, useSelector } from "react-redux";
import "./Comment.css";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import moment from "moment";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Input,
} from "@chakra-ui/react";

const CommentSection = ({ id }) => {
  useEffect(() => {
    dispatch(getComments(id));
  }, []);

  const dispatch = useDispatch();
  
  const comments = useSelector(state => state.comments.comments);
  const user = useSelector(state => state.auth.user);
  
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [commentId, setCommentId] = useState();
  const [formData, setFormData] = useState({ text: "", id: "" });

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
    dispatch(deleteComment(commentId));
    onCloseDelete();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(editComment(formData, id));
    onCloseEdit();
  };

  return (
    <>
      <div id="commentSection">
        {comments &&
          comments.map((comment) => (
            <div key={comment.commentId} className="view-comment-container">
              <div className="view-comment-commentText">
                <span>{comment.commentText}</span>
              </div>
              <div className="view-comment-commentDate">
                <span>
                  {moment(moment(comment.commentDate).format()).fromNow()}
                </span>
              </div>
              <div className="view-comment-deleteEdit">
                {user.userId === comment.userId && (
                  <>
                    <EditIcon
                      id="edit-icon"
                      className="hover-icon"
                      color="#90CDF4"
                      mr="7"
                      onClick={(e) => {
                        onOpenEdit();
                        setFormData({
                          text: comment.commentText,
                          id: comment.commentId,
                        });
                      }}
                    />
                    <DeleteIcon
                      id="delete-icon"
                      className="hover-icon"
                      color="#90CDF4"
                      onClick={(e) => {
                        onOpenDelete();
                        setCommentId(comment.commentId);
                      }}
                    />
                  </>
                )}
              </div>
            </div>
          ))}
      </div>
      <Modal isOpen={showDelete} onClose={onCloseDelete}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody padding="5">
            <div>
              <ModalCloseButton />
            </div>
            <div className="modal-delete-title">
              <span className="font-style">
                Are you sure you want to delete this comment?
              </span>
            </div>

            <div className="modal-delete-btn">
              <button className="delete-comment-btn" onClick={onDeleteClick}>
                <span className="font-style">Delete</span>
              </button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={showEdit} onClose={onCloseEdit}>
        <ModalOverlay />
        <form onSubmit={(e) => onSubmit(e)}>
          <ModalContent>
            <div>
              <ModalCloseButton />
            </div>
            <div className="modal-edit-title">
              <span className="font-style">Edit Your Comment</span>
            </div>
            <div className="modal-edit-input">
              <Input
                variant="flushed"
                focusBorderColor="#bee3f8"
                required
                value={formData.text}
                onChange={(e) =>
                  setFormData({ ...formData, text: e.target.value })
                }
              />
            </div>
            <div className="modal-edit-btn">
              <button type="submit">
                <span className="font-style">Save</span>
              </button>
            </div>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default CommentSection;
