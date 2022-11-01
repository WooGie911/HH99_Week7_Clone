import React from "react";

import { useDispatch, useSelector } from "react-redux";
import Button from "../components/elements/Button";
import Input from "../components/elements/Input";
import { __editPost } from "../redux/modules/postSlice";
import useInput from "../hooks/useInput";
import styled from "styled-components";

const Update = (props) => {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.comment.post);

  //커스텀훅 useInput 사용
  const [input, setInput, onChangeHandlerInput] = useInput(posts);

  //모달창 온오프
  const closeModalUpdate = () => {
    props.setModalUpdate(false);
  };

  const onClickUpdate = (data) => {
    const formData = new FormData();
    formData.append("contents", data.content);
    const Fdata = { postId: data.postId, formData: formData };
    dispatch(__editPost(Fdata));
    // navigate(`/Detail/${paramsid.id}`);
    props.setModalUpdate(false);
  };

  return (
    <>
      <Background onClick={closeModalUpdate}>
        <p>상세보기</p>
        <StModalDetailBT onClick={closeModalUpdate}>X</StModalDetailBT>
        <StModalDetail onClick={(e) => e.stopPropagation()}>
          <Stlogin_box_Left_img src={input.img} />
          <Stlogin_box_Right>
            <label>내용</label>
            <Input
              size="textarea"
              type="text"
              name="content"
              value={input.content || ""}
              onChange={onChangeHandlerInput}
            />
            <Button onClick={() => onClickUpdate(input)}>수정완료</Button>
            <Button
              onClick={() => {
                props.setModalUpdate(false);
              }}
            >
              수정취소
            </Button>
          </Stlogin_box_Right>
        </StModalDetail>
      </Background>
    </>
  );
};

export default Update;

const Stlogin_box_Left_img = styled.img`
  width: 10%;
  height: 10%;
  color: #ffffff;
  position: relative;
  background-position: center;
  background-size: cover;
`;

const Stlogin_box_Right = styled.div`
  width: 45%;
  height: 100%;
  padding: 25px 25px;
  background: linear-gradient(-45deg, #dcd7e0, #fff);
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 0;
`;

const StModalDetail = styled.div`
  /* 모달창을 화면 중앙. 최상단에 노출 */

  /* 모달창 크기 */
  width: 1000px;
  height: 800px;

  /* 최상단 위치 */
  z-index: 999;

  /* 중앙 배치 */
  /* top, bottom, left, right 는 브라우저 기준으로 작동한다. */
  /* translate는 본인의 크기 기준으로 작동한다. */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  /* 모달창 디자인 */
  background-color: gray;
  border: 1px solid black;
  border-radius: 8px;

  /* 모달창 내부 X버튼 */
`;
const StModalDetailBT = styled.button`
  .close {
    position: absolute;
    right: 10px;
    top: 10px;
  }
`;
