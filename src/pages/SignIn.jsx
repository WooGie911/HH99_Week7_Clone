import React, { useState }  from "react";
import { useDispatch } from "react-redux";
import { __Login } from "../redux/modules/signinSlice";
import { useNavigate } from "react-router-dom";





const SignIn = () => {

  const initialState = {
    username: "",
    password: "",
  };
  const [input, setInput] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ChangeInputHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    console.log(input);
  };
  const getRandom = () => Math.random();
  const inputId = getRandom();

  const onSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(__Login(input));
    setInput(input);
    console.log(input)
  };



  return (
  <div>
    <input
     type="text"
     name="username"
     onChange={ChangeInputHandler}
     placeholder="ID"
     value={input.username}
     />
    <input
     type="text"
     name="password"
     onChange={ChangeInputHandler}
     placeholder="PASSWORD"
     value={input.username}
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
  </div>
  )
};

export default SignIn;
