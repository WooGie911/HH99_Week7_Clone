import React from "react";
import { useDispatch} from "react-redux";
import styled from "styled-components";
import signupSlice, { __SignUp } from "../redux/modules/signupSlice";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const SignUp = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialstate = 
  {
    email:"",
    username:"",
    nickname:"",
    pwdcheck1:"",
    pwdcheck2:"",
  };
  const [input,setInput] = useState(initialstate);
  const userdata = useSelector((state) => state.insta);

  const [checkPW, setCheckPW] = useState({ msg: "", isOk: "false" });
  const [checkPW2, setCheckPW2] = useState({ msg: "", isOk: "false" });
  

  const changeInputHandler = (e) => {
    const {name,value}  = e.target;
    setInput({...input, [name]:value});
    console.log(input)
  };

  const SubmitHandler = (e) =>{
    e.preventDefault();
    if(
      input.nickname === "" ||
      input.username === "" ||
      input.nickname ==="" ||
      input.pwdcheck1 === "" ||
      input.pwdcheck2 === ""
      
    ){
      return alert("입력을 확인하세요");
    }

    if (checkPW.isOk === false || checkPW2.isOk === false) {
      return alert("비밀번호를 확인하세요!");
    }

    if(input.pwdcheck1 !== input.pwdcheck2){
      return alert('비밀번호가 일치하지 않습니다');
      
   }
 
  

    dispatch(__SignUp(input));
    setInput(initialstate);
    console.log(setInput)
    navigate("/")
  };

 

  return (
    <Stbacktitle>
      <Sttitlediv>
      <StForm >
          <input 
          type="text"
          name="email"
          value={input.email}
          onChange={changeInputHandler}
          placeholder="아이디"

          />
         <input
         type="text"
         name="username"
         value={input.username}
         onChange={changeInputHandler}
         placeholder="이름"
         />
         <input
         type="text"
         name="nickname"
         value={input.nickname}
         onChange={changeInputHandler}
         placeholder="닉네임"
         />
         <input
         type="text"
         name="pwdcheck1"
         value={input.pwdcheck1}
         onChange={changeInputHandler}
         placeholder="비밀번호"
         />
          <input
         type="text"
         name="pwdcheck2"
         value={input.pwdcheck2}
         onChange={changeInputHandler}
         placeholder="비밀번호확인"
         />
         <div>저희</div>
            <button 
            type="submit" 
            onClick={SubmitHandler}
            >가입</button>
        </StForm>
      </Sttitlediv>
      
    </Stbacktitle>

  )

};

export default SignUp;


const Sttitlediv = styled.div`
width:350px;
height:575px;
border: 1px solid #dbdbdb;
margin: 0 0 10px 0;
padding: 10px 0 10px 0;
position: relative;
top:0px;
botton:0px;
right:0px;
left:0px;
display:flex
`

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
`
const StForm = styled.form`
height: 430.984px;
width: 348px;
border: 1px solid black;
position:relative;
top:60px;
`
const Stinputwrap = styled.div`

`