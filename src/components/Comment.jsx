import React from "react";
import { useDispatch } from "react-redux";
import { __addComment } from "../redux/modules/commentSlice";
import useInput from "../hooks/useInput";
import styled from "styled-components";
import EMOlogo from "./icons/댓글 이모티콘.png";

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
    window.location.replace("/Main");
  };

  return (
    <>
      <StEmo src={EMOlogo} />
      <StInput
        placeholder="댓글 달기..."
        value={comments.comment || ""}
        name="comment"
        type="text"
        onChange={onChangeInputHandler}
      />
      <StBt onClick={onClickAddButton}>게시</StBt>
    </>
  );
};

export default Comment;

const StEmo = styled.img`
  /* padding-top: 5px; */
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 15px;
  width: 20px;
  height: 20px;
  border: 0 solid transparent;
  background-color: transparent;
  cursor: pointer;
`;
const StInput = styled.input`
  width: 380px;
  border: transparent;
  background-color: transparent;
`;
const StBt = styled.button`
  position: absolute;
  right: 10px;
  height: 50px;
  border: transparent;
  background-color: transparent;
  color: skyblue;
`;
