import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  post: [{}],
  comment: [],
};

export const __Login = createAsyncThunk(
  "signin/__Login",
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      const data = await axios.post(
        `${process.env.REACT_APP_SERVER}/auth/login`,
        // `${process.env.REACT_APP_SERVER}/auth/login`,
        payload
      );

      if (data.status === 200 || data.status === 201) {
        window.localStorage.setItem("Access_Token", data.headers.authorization);
        window.localStorage.setItem("Refresh_Token", data.headers.refresh);
        // setCookie("Access_Token", Access_Token);
        // setCookie("Refresh_Token", Refresh_Token);
        // setCookie("nickname", data.data.data);
        alert("로그인 성공");
        window.location.replace("/Main");
      }
      console.log("로그인 응답", data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log("로그인 에러", error.response.data.message);
      if (error.response.status >= 400 && error.response.status < 500) {
        alert("로그인 실패");
      }
      if (error.response.status === 400) {
        //비밀번호 오류
        alert(`${error.response.data.field}가 ${error.response.data.message}`);
      } else if (error.response.data.message !== undefined) {
        //아이디 오류
        alert(`${error.response.data.field} ${error.response.data.message}`);
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const signinSlice = createSlice({
  name: "signin",
  initialState,

  reducers: {},
  extraReducers: {
    //__Login
    [__Login.pending]: (state) => {
      state.isLoading = true;
    },
    [__Login.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [__Login.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default signinSlice.reducer;
