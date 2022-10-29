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
    memberEmail:"",
    memberName:"",
    pwCheck:"",
    memberPw:"",
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
      input.memberEmail === "" ||
      input.memberName === "" ||
      input.memberPw === "" ||
      input.pwCheck === ""
      
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
          name="memberEmail"
          value={input.memberEmail}
          onChange={changeInputHandler}
          placeholder="아이디"

          />
         <input
         type="text"
         name="memberName"
         value={input.memberName}
         onChange={changeInputHandler}
         placeholder="이름"
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