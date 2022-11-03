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
import styled from "styled-components";
import Userlogo from "./icons/프로필.PNG";
import Likelogo from "./icons/하트.png";

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
                <StContent>
                  <STUser src={Userlogo} />
                  <span className="TopSp">{comment.name} </span>
                  <span className="TopSp"> {comment.comment}</span>

                  <LikeButton onClick={() => onheartButton(comment.commentId)}>
                    {comment.amILike ? "❤️" : "🤍"}
                  </LikeButton>
                </StContent>
                {comment.createdAt} <strong> 좋아요</strong> {comment.likeSize}
                개
                {/* <button onClick={() => onDeleteButton(comment.commentId)}>
                  답글 달기
                </button> */}
                <LikeButton onClick={() => onDeleteButton(comment.commentId)}>
                  🗑️
                </LikeButton>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default CommentList;

const STUser = styled.img`
  width: 30px;
  height: 30px;
`;

const LikeButton = styled.button`
  width: 30px;
  height: 30px;
  border: 0 solid transparent;
  background-color: transparent;
  cursor: pointer;
  position: absolute;
  right: 10px;
`;

const StContent = styled.div`
  display: flex;
  align-items: center;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-top: 15px;
  margin-left: 3px;
  .TopSp {
    margin-left: 5px;
  }
`;
