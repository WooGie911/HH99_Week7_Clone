import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Write from "../pages/Write";
import Detail from "../pages/Detail";
import Update from "../pages/Update";
import Mypage from "../pages/Mypage";


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
    
        <Route path="/Main" element={<Main />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/Write" element={<Write />} />
        <Route path="/Detail/:id" element={<Detail />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Update" element={<Update />} />
        <Route path="/Mypage" element={<Mypage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
