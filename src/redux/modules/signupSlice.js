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
        .post(`http://44.203.190.144/auth/signup`, payload)
        // .post(`${process.env.REACT_APP_SERVER}/auth/signup`, payload)

        .then((response) => {
          console.log(response);
          return thunkAPI.fulfillWithValue(response.data);
        });
      console.log(data.data);
    } catch (error) {
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
