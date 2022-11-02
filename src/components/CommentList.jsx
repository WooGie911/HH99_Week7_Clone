import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  __addComment,
  __deleteComment,
  __heartComment,
  __getPostDetail,
  P_id,
} from "../redux/modules/commentSlice";
import { _ModalDetail } from "../redux/modules/postSlice";

// import { __getPostDetail } from "../redux/modules/postSlice";

const CommentList = (props) => {
  const dispatch = useDispatch();
  // const commentList = useSelector((state) => state.comment.post.commentList);
  const commentList = useSelector((state) => state.comment.post.commentList);
  // console.log("commentList", commentList);
  const P_id = useSelector((state) => state.comment.P_ID);

  const onDeleteButton = (payload) => {
    console.log(payload);
    dispatch(__deleteComment(payload));
    dispatch(_ModalDetail(false));
    window.location.replace("/Main");
  };
  const onheartButton = (payload) => {
    dispatch(__heartComment(payload));
  };
  useEffect(() => {
    dispatch(__getPostDetail(P_id));
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
                  <button onClick={() => onheartButton(comment.commentId)}>
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
