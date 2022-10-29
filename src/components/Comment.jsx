import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "./elements/Button";
import Input from "./elements/Input";
import { useParams } from "react-router-dom";
import { __addComment } from "../redux/modules/commentSlice";
import useInput from "../hooks/useInput";

const Comment = () => {
  const dispatch = useDispatch();
  const paramsid = useParams();
  const initialState = { comment: "" };

  //커스텀훅 useInput 사용
  const [comments, setComments, onChangeInputHandler] = useInput(initialState);

  const onClickAddButton = (e) => {
    e.preventDefault();
    const Fdata = { id: Number(paramsid.id), comment: comments.comment };
    if (comments.comment.trim() === "") {
      return alert("댓글을 입력하세요.");
    }
    dispatch(__addComment(Fdata));
    setComments({
      name: "",
      comment: "",
    });
  };

  return (
    <>
      <Input
        placeholder="댓글을 입력하세요"
        value={comments.comment || ""}
        name="comment"
        type="text"
        onChange={onChangeInputHandler}
      />
      <Button size="large" color="reverse" onClick={onClickAddButton}>
        추가하기
      </Button>
    </>
  );
};

export default Comment;
