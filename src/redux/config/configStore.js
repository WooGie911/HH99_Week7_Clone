import post from "../modules/postSlice";
import comment from "../modules/commentSlice";
import signup from "../modules/signupSlice";
import signin from "../modules/signinSlice";

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: { post: post, comment: comment, signup: signup, signin: signin },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),

  //배포모드에서 리덕스 데브툴 사용 안함
  devtools: process.env.REACT_APP_MOD !== "production",
});

export default store;
