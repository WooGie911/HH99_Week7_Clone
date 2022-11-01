import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  __addComment,
  __deleteComment,
  __hartComment,
} from "../redux/modules/commentSlice";
import { __getPostDetail } from "../redux/modules/commentSlice";

// import { __getPostDetail } from "../redux/modules/postSlice";

const CommentList = (props) => {
  const dispatch = useDispatch();
  // const commentList = useSelector((state) => state.comment.post.commentList);
  const commentList = useSelector((state) => state.comment.post.commentList);
  // console.log("commentList", commentList);

  const onDeleteButton = (payload) => {
    console.log(payload);
    dispatch(__deleteComment(payload));
  };
  const onHartButton = (payload) => {
    dispatch(__hartComment(payload));
  };
  useEffect(() => {
    dispatch(__getPostDetail(props.POSTID));
  }, [dispatch]);

  return (
    <>
      <div>
        {commentList &&
          commentList.map((comment, index) => {
            return (
              <div key={index}>
                <div>프로필 이미지</div>
                <div>
                  {comment.username} : {comment.comment}
                  <button onClick={() => onHartButton(comment.commentId)}>
                    하트
                  </button>
                  <div>{comment.createdAt}</div>
                  <div>좋아요 {comment.likeSize}개</div>
                  {/* <button onClick={() => onDeleteButton(comment.commentId)}>
                  답글 달기
                </button> */}
                  <button onClick={() => onDeleteButton(comment.commentId)}>
                    삭제하기
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default CommentList;
