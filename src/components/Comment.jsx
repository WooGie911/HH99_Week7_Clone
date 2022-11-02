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
      <STEmo src={EMOlogo} />
      <input
        placeholder="댓글 달기..."
        value={comments.comment || ""}
        name="comment"
        type="text"
        onChange={onChangeInputHandler}
      />
      <button size="medium" color="reverse" onClick={onClickAddButton}>
        게시
      </button>
    </>
  );
};

export default Comment;

const STEmo = styled.img`
  /* padding-top: 5px; */
  margin-top: 10px;
  width: 20px;
  height: 20px;
  border: 0 solid transparent;
  background-color: transparent;
  cursor: pointer;
`;
