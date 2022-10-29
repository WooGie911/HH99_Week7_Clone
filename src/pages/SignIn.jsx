import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { __Login } from "../redux/modules/signinSlice";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";





const SignIn = () => {

  const initialState = {
    memberEmail: "",
    memberPw: "",
  };
  const [input, setInput] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ChangeInputHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    console.log(input);
  };


  const onSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(__Login(input));
    setInput(initialState);
    console.log(input)
  };



  return (
// {/* <div>
//   <div>
//     <h1></h1>
//     <form>
//       <p>
        
//       </p>
//     </form>
//   </div>
// </div>
       
//             <label>아이디</label> */}
            <div>
              <form>
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
            <button
              type="submit"
              onClick={onSubmitHandler}>
              로그인
            </button>
            <button
              onClick={() => {
                navigate("/SignUp");
              }}
            >
              회원가입
            </button>
       
              </form>
            </div>
         
            

       

     









  )
};

export default SignIn;






