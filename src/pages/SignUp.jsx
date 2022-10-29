import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { __SignUp } from "../redux/modules/signupSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/elements/Button";
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
    // if ({input.password} === {input.password2}) {
    //   return alert("비밀번호가 일치하지 않습니다.");
    // }
    dispatch(__SignUp(input));
    setInput(initialstate);
    navigate("/");
  };

  return (
    <Stbacktitle>
      <Sttitlediv>
        <StForm>
          <input
            type="text"
            name="memberEmail"
            value={input.memberEmail}
            onChange={changeInputHandler}
            placeholder="ID"
          />
          <input
            type="text"
            name="memberName"
            value={input.memberName}
            onChange={changeInputHandler}
            placeholder="사용자 이름"
          />

          <input
            type="text"
            name="memberPw"
            value={input.memberPw}
            onChange={changeInputHandler}
            placeholder="비밀번호"
          />
          <input
            type="text"
            name="pwCheck"
            value={input.pwCheck}
            onChange={changeInputHandler}
            placeholder="비밀번호확인"
          />
          <Button onClick={SubmitHandler} size="medium" color="reverse">
            가입
          </Button>
          <StRight_contact>
            <h5>계정이 있으신가요?</h5>
            <StButton
              onClick={() => {
                navigate("/");
              }}
              size="medium"
              color="reverse"
            >
              로그인
            </StButton>
          </StRight_contact>
        </StForm>
      </Sttitlediv>
    </Stbacktitle>
  );
};

export default SignUp;

const Sttitlediv = styled.div`
  width: 350px;
  height: 575px;
  border: 1px solid #dbdbdb;
  margin: 0 0 10px 0;
  padding: 10px 0 10px 0;
  position: relative;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  display: flex;
`;

const Stbacktitle = styled.div`
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-content: stretch;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  overflow: hidden;
  margin-bottom: calc(var(--base-unit) * 11);
  margin-top: 70px;
`;
const StForm = styled.form`
  height: 430.984px;
  width: 348px;
  border: 1px solid black;
  position: relative;
  top: 60px;
`;
const Stinputwrap = styled.div``;

const StButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`;

const StRight_contact = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  margin-top: 30px;
`;
