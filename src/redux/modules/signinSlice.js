import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  signin: [{}],
  comment: [],
  
};

export const __Login = createAsyncThunk(
  "signin/__Login",
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      const data = await axios.post(
        `http://44.203.190.144/auth/login`,
        payload
      );
        console.log(data)
      if (data.status === 200 || data.status === 201) {
        window.localStorage.setItem("Access_Token", data.headers.authorization);
        window.localStorage.setItem("Refresh_Token", data.headers.refresh
        );
        // setCookie("Access_Token", Access_Token);
        // setCookie("Refresh_Token", Refresh_Token);
        // setCookie("nickname", data.data.data);
        alert("로그인 성공");
        // console.log(accessToken);
        // console.log(refreshToken);
        // console.log(data.data.nickname);
        // window.location.replace("/Main");
      }
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      if (error.data.status > 400 && error.data.status < 500) {
        // window.location.reload();
        alert("로그인 실패");
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
