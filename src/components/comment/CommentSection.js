import React, { useEffect } from "react";
import {
  getComments,
  deleteComment,
  editComment,
} from "../../redux/action/comment";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./Comment.css";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import moment from "moment";
import { Box, Text, Grid, GridItem } from "@chakra-ui/react";

const CommentSection = ({ id, comments, getComments, deleteComment }) => {
  useEffect(() => {
    getComments(id);
  }, []);

  const onDeleteClick = (id) => {
    deleteComment(id);
  };

  return (
    <div id="commentSection">
      {comments &&
        comments.map((comment) => (
          <div key={comment.commentId}>
            <Box p={2} shadow="sm" borderWidth="1px">
              <Grid
                templateRows="repeat(1, 1fr)"
                templateColumns="repeat(5, 1fr)"
                gap={1}
              >
                <GridItem colSpan={4} rowSpan={2} pl={2} pt={3}>
                  <Text fontSize="md" as="samp" colorScheme="teal">
                    {comment.commentText}
                  </Text>
                </GridItem>
                <GridItem colSpan={1}>
                  <Text fontSize={10} as="samp" colorScheme="teal">
                    {moment(
                      moment(comment.commentDate).add(-7, "hour").format()
                    ).fromNow()}
                  </Text>
                </GridItem>
                <GridItem colSpan={1}>
                  <EditIcon color="teal" mr="7" />
                  <DeleteIcon
                    color="teal"
                    onClick={(e) => onDeleteClick(comment.commentId)}
                  />
                </GridItem>
              </Grid>
            </Box>
            {/* <div className="commentText">{comment.commentText}</div>
            <div className="commentBottom"></div> */}
          </div>
        ))}
    </div>
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
