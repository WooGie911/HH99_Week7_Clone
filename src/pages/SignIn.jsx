import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { __Login } from "../redux/modules/signinSlice";
import { useNavigate } from "react-router-dom";
import Button from "../components/elements/Button";
import styled from "styled-components";
import useInput from "../hooks/useInput";

const SignIn = () => {
  const initialState = {
    memberEmail: "",
    memberPw: "",
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //커스텀훅 useInput 사용
  const [input, setInput, ChangeInputHandler] = useInput(initialState);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (input.memberEmail === "" || input.memberPw === "") {
      return alert("입력을 확인하세요.");
    }
    dispatch(__Login(input));
    setInput(input);
  };

  return (
    <StWrapper>
      <StSignupBox>
        <StLoginBox>
          <StImgBox />
          <StInputBox
            type="text"
            name="memberEmail"
            onChange={ChangeInputHandler}
            placeholder="ID"
            value={input.memberEmail}
          />
          <StInputBox
            type="text"
            name="memberPw"
            onChange={ChangeInputHandler}
            placeholder="PASSWORD"
            value={input.memberPw}
          />
          <StButton onClick={onSubmitHandler} size="medium" color="reverse">
            로그인
          </StButton>
          계정이 있으신가요?
          <StSignupBox
            onClick={() => {
              navigate("/SignUp");
            }}
          >
            가입하기
          </StSignupBox>
        </StLoginBox>
      </StSignupBox>
    </StWrapper>
  );
};

export default SignIn;

const StWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #fafafa;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StLoginBox = styled.div`
  width: 400px;
  height: 500px;
  background-color: white;
  border: 1px solid #bababa;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StImgBox = styled.div`
  width: 60%;
  background-image: url("https://blog.kakaocdn.net/dn/SjvFN/btreg3CYQb2/3uu6ofxOgBcoTDzEU1s6q0/img.png");
  background-size: 100% 100%;
  height: 230px;
  margin-top: -20px;
`;

const StSignupBox = styled.div`
  width: 400px;
  margin-top: 30px;
  height: 10vh;
  background-color: white;
  border: 1px solid #bababa;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
`;

const StInputBox = styled.input`
  width: 70%;
  height: 35px;
  margin-top: 10px;
  background-color: #fafafa;
  border: 1px solid #d4d4d4;
  border-radius: 5px;
  &:focus,
  &:active {
    outline: none;
  }
  padding-left: 10px;
`;

const StButton = styled.button`
  width: 70%;
  height: 35px;
  margin-top: 30px;
  border: none;
  color: white;
  font-weight: 600;
  font-size: 18px;
  background-color: ${({ username, password }) =>
    username !== "" && password !== "" ? "#0095f6" : "#ececec"};
  cursor: ${({ username, password }) =>
    username !== "" && password !== "" ? "pointer" : null};
`;
