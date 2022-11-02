import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: [],
  isLoading: true,
  error: null,
  isFinish: false,
};

export const __SignUp = createAsyncThunk(
  "signup/__SignUp",
  async (payload, thunkAPI) => {
    try {
   
      const data = await axios
        .post(`http://13.124.38.31/auth/signup`, payload)
        // .post(`${process.env.REACT_APP_SERVER}/auth/signup`, payload)

        .then((response) => {
   
          return thunkAPI.fulfillWithValue(response.data);
        });
   
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
