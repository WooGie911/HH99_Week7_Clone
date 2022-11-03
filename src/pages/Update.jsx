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
  //수정완료 버튼
  const onClickUpdate = (data) => {
    if (data.content === "") {
      return alert("수정할 내용을 입력해주세요.");
    }
    const formData = new FormData();
    formData.append("content", data.content);
    const Fdata = { postId: data.postId, formData: formData };
    dispatch(__editPost(Fdata));
    console.log("formData", formData);
    console.log("input.postId", input.postId);
    console.log("input", input);
    // window.location.replace("/Main");
  };

  return (
    <>
      <Background onClick={closeModalUpdate}>
        <StModalDetail onClick={(e) => e.stopPropagation()}>
          <St_Modal>
            <St_Modal_Ca>
              <button
                className="TopBt"
                onClick={() => {
                  props.setModalUpdate(false);
                }}
              >
                수정취소
              </button>

              <div className="title">
                <a>정보 수정</a>
              </div>

              <button className="TopBt2" onClick={() => onClickUpdate(input)}>
                수정완료
              </button>
            </St_Modal_Ca>

            <St_Modal_BOX>
              <Stmodal_box_Left>
                {input.img && <Stmodal_box_Left_img src={input.img} />}
              </Stmodal_box_Left>
              <Stmodal_box_Right>
                <Input
                  size="textarea"
                  type="text"
                  name="content"
                  value={input.content || ""}
                  onChange={onChangeHandlerInput}
                />
              </Stmodal_box_Right>
            </St_Modal_BOX>
          </St_Modal>
        </StModalDetail>
      </Background>
    </>
  );
};

export default Update;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.185);
  z-index: 0;
  display: flex;
  flex-wrap: wrap;
`;

const StModalDetail = styled.div`
  /* 모달창 크기 */
  width: 1200px;
  height: 850px;
  /* 최상단 위치 */
  z-index: 999;
  /* 중앙 배치 */
  /* translate는 본인의 크기 기준으로 작동한다. */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* 모달창 디자인 */
  background-color: gray;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
`;

const Stmodal_box_Left_img = styled.img`
  width: 100%;
`;
const Stmodal_box_Left = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  width: 55%;
  height: 800px;
  color: #ffffff;
  background-color: black;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const Stmodal_box_Right = styled.div`
  width: 45%;
  height: 800px;
  background: #fff;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const St_Modal = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: column;
`;
const St_Modal_Ca = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 50px;
  background-color: white;
  border-radius: 10px;
  .title {
    flex-grow: 1;
    font-size: 20px;
    font-weight: bold;
    display: flex;
    align-items: center;
    position: relative;
    justify-content: center;
    justify-items: center;
  }
  .TopBt {
    position: relative;
    border: transparent;
    border-radius: 10px;
    width: 100px;
    font-size: 20px;
    color: skyblue;
    background-color: transparent;
  }
  .TopBt2 {
    position: relative;
    right: 100px;
    border: transparent;
    border-radius: 10px;
    width: 100px;
    font-size: 20px;
    color: skyblue;
    background-color: transparent;
  }
`;
const St_Modal_BOX = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
`;
