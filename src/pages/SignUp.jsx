import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { __SignUp } from "../redux/modules/signupSlice";
import { useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialstate = {
    memberEmail: "",
    memberName: "",
    memberPw: "",
    pwCheck: "",
  };

  //커스텀훅 useInput 사용
  const [input, setInput, changeInputHandler] = useInput(initialstate);

  const SubmitHandler = (e) => {
    e.preventDefault();
    if (
      input.memberEmail === "" ||
      input.memberName === "" ||
      input.memberPw === "" ||
      input.pwCheck === ""
    ) {
      return alert("입력을 확인하세요.");
    }
    if (input.memberPw !== input.pwCheck) {
      return alert("비밀번호가 일치하지 않습니다.");
    }
    dispatch(__SignUp(input));
    setInput(initialstate);
  };

  return (
    <StWrapper>
      <StSignupBox>
        <StImgBox />
        <StInputBox
          type="text"
          name="memberEmail"
          value={input.memberEmail}
          onChange={changeInputHandler}
          placeholder="ID"
        />
        <StInputBox
          type="text"
          name="memberName"
          value={input.memberName}
          onChange={changeInputHandler}
          placeholder="사용자 이름"
        />

        <StInputBox
          type="text"
          name="memberPw"
          value={input.memberPw}
          onChange={changeInputHandler}
          placeholder="비밀번호"
        />
        <StInputBox
          type="text"
          name="pwCheck"
          value={input.pwCheck}
          onChange={changeInputHandler}
          placeholder="비밀번호확인"
        />
        <StButton onClick={SubmitHandler} size="medium" color="reverse">
          가입
        </StButton>

        <StLoginBox>
          <h5>계정이 있으신가요?</h5>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            로그인
          </button>
        </StLoginBox>
      </StSignupBox>
    </StWrapper>
  );
};

export default SignUp;

const StWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #fafafa;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StSignupBox = styled.div`
  background-color: white;
  border: 1px solid #dbdbdb;
  width: 400px;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StImgBox = styled.div`
  background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4jKAVNgwwCGBxuMlIQEeiCrNIZm2JA-D_-g&usqp=CAU");
  background-size: 100% 100%;
  height: 130px;
  width: 75%;
  margin-bottom: 50px;
`;

const StInputBox = styled.input`
  background-color: #fafafa;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  &:focus,
  &:active {
    outline: none;
  }
  width: 66%;
  height: 40px;
  margin-top: 10px;
  padding-left: 10px;
`;

const StButton = styled.button`
  width: 280px;
  height: 35px;
  margin-top: 30px;
  border: none;
  color: white;
  font-size: 20px;
  border-radius: 7px;
  background-color: ${({ userid, password, username, nickname }) =>
    userid !== "" && password !== "" && username !== "" && nickname !== ""
      ? "#0095f6"
      : "#ececec"};
  cursor: ${({ userid, password, username, nickname }) =>
    userid !== "" && password !== "" && username !== "" && nickname !== ""
      ? "pointer"
      : null};
`;

const StLoginBox = styled.div`
  width: 400px;
  height: 10vh;
  margin-top: 15px;
  background-color: white;
  border-top: 1px solid #dbdbdb;
  border-radius: 1px solid #bababa;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
`;
