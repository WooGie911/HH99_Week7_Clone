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
    <>
      <Stbacktitle>
        <Sttitlediv>
          <StForm>
            <input
              type="text"
              name="memberEmail"
              onChange={ChangeInputHandler}
              placeholder="ID"
              value={input.memberEmail}
            />
            <input
              type="text"
              name="memberPw"
              onChange={ChangeInputHandler}
              placeholder="PASSWORD"
              value={input.memberPw}
            />
            <Button onClick={onSubmitHandler} size="medium" color="reverse">
              로그인
            </Button>
            <StRight_contact>
              <h5>계정이 없으신가요?</h5>
              <StButton
                onClick={() => {
                  navigate("/SignUp");
                }}
                size="medium"
                color="reverse"
              >
                가입하기
              </StButton>
            </StRight_contact>
          </StForm>
        </Sttitlediv>
      </Stbacktitle>
    </>
  );
};

export default SignIn;

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
