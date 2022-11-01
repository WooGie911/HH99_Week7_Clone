import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "./elements/Button";
import Input from "./elements/Input";
import { __addComment } from "../redux/modules/commentSlice";
import useInput from "../hooks/useInput";

const Comment = (props) => {
  const dispatch = useDispatch();

  const initialState = { comment: "" };

  //커스텀훅 useInput 사용
  const [comments, setComments, onChangeInputHandler] = useInput(initialState);

  const onClickAddButton = (e) => {
    e.preventDefault();
    const Fdata = {
      id: props.postId,
      comment: { comment: comments.comment },
    };
    if (comments.comment.trim() === "") {
      return alert("댓글을 입력하세요.");
    }
    dispatch(__addComment(Fdata));
    setComments({
      Comment: "",
    });
  };

  return (
    <>
      <Input
        placeholder="댓글 달기..."
        value={comments.comment || ""}
        name="comment"
        type="text"
        onChange={onChangeInputHandler}
      />
      <Button size="small" color="reverse" onClick={onClickAddButton}>
        게시
      </Button>
    </>
  );
};

export default Comment;
