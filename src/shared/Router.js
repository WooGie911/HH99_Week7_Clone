import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Write from "../pages/Write";
import Update from "../pages/Update";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Main" element={<Main />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/Write" element={<Write />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Update/:id" element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
