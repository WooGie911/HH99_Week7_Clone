import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  post: [{}],
  comment: [],
};

export const __SignUp = createAsyncThunk(
  "signup/__SignUp",
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      const data = await axios
        .post(`https://jkk.p-e.kr/auth/signup`, payload)
        // .post(`${process.env.REACT_APP_SERVER}/auth/signup`, payload)

        .then((response) => {
          console.log("회원가입response", response);
          return thunkAPI.fulfillWithValue(response.data);
        });
      console.log("회원가입응답", data);
    } catch (error) {
      console.log("error", error);
      //이미 존재하는 데이터 예외처리 (아이디, 닉네임)
      if (error.response.data.message !== undefined) {
        return window.alert(error.response.data.message);
      }
      //입력 형식에 맞지 않는 예외처리 메시지 (이메일형식, 비밀번호 형식)
      window.alert(error.response.data[0].message);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const signupSlice = createSlice({
  name: "signup",
  initialState,

  reducers: {},
  extraReducers: {
    //__SignUp
    [__SignUp.pending]: (state) => {
      state.isLoading = true;
    },
    [__SignUp.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [__SignUp.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default signupSlice.reducer;
