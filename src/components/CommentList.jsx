import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  __getComment,
  __addComment,
  __deleteComment,
} from "../redux/modules/commentSlice";
import { useParams } from "react-router-dom";

const CommentList = () => {
  const dispatch = useDispatch();
  const paramsid = useParams();
  const commentList = useSelector((state) => state.comment.comment);

  const onDeleteButton = (payload) => {
    dispatch(__deleteComment(payload));
  };

  useEffect(() => {
    dispatch(__getComment(paramsid.id));
  }, [dispatch]);

  return (
    <>
      <div>
        {commentList.map((comment) => {
          return (
            <div key={comment.id}>
              <div>
                {comment.username} :{comment.comment}
                <button onClick={() => onDeleteButton(comment.id)}>
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
