import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  post: [
    {
      id: 1,
      username: "kim",
      content: "ㅡㅡ",
      comment: [
        { id: 1, comment: "zzzz" },
        { id: 2, comment: "zssz" },
        { id: 3, comment: "zzdasdz" },
      ],
    },
    { id: 2, username: "lee", content: "ㅋㅋㅋㅋ" },
    { id: 3, username: "park", content: "ㅠㅠ" },
  ],
  comment: [
    { id: 1, comment: "zzzz" },
    { id: 2, comment: "zssz" },
    { id: 3, comment: "zzdasdz" },
  ],
};

const accessToken = localStorage.getItem("Access_Token");
const refreshToken = localStorage.getItem("Refresh_Token");

export const __getPost = createAsyncThunk(
  "post/__getPost",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/articles`
      );
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __addPost = createAsyncThunk(
  "post/__addPost",
  async (payload, thunkAPI) => {
    try {
      await axios
        .post(`${process.env.REACT_APP_SERVER}/api/article`, payload, {
          headers: {
            enctype: "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
            RefreshToken: refreshToken,
            "Cache-Control": "no-cache",
          },
        })
        .then((response) => {
          console.log("response", response.data);
        });
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deletePost = createAsyncThunk(
  "post/__deletePost",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.delete(
        `${process.env.REACT_APP_SERVER}/api/article/${payload}`,
        {
          headers: {
            enctype: "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
            RefreshToken: refreshToken,
            "Cache-Control": "no-cache",
          },
        }
      );
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __editPost = createAsyncThunk(
  "post/__editPost",
  async (payload, thunkAPI) => {
    console.log("payload", payload);
    try {
      const data = await axios.put(
        `${process.env.REACT_APP_SERVER}/api/article/${payload.id}`,
        payload.formData,
        {
          headers: {
            enctype: "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
            RefreshToken: refreshToken,
            "Cache-Control": "no-cache",
          },
        }
      );
      console.log("data", data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,

  reducers: {},
  extraReducers: {
    //__getPost
    [__getPost.pending]: (state) => {
      state.isLoading = true;
    },
    [__getPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.post = action.payload;
    },
    [__getPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //__addPost
    [__addPost.pending]: (state) => {
      state.isLoading = true;
    },
    [__addPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.post = action.payload;
    },
    [__addPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //__deletePost
    [__deletePost.pending]: (state) => {
      state.isLoading = true;
    },
    [__deletePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.post = state.post.filter((post) => post.id !== action.payload);
    },

    [__deletePost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //__editPost
    [__editPost.pending]: (state) => {
      state.isLoading = true;
    },
    [__editPost.fulfilled]: (state, action) => {
      state.isLoading = false;

      const indexId = state.post.findIndex((post) => {
        if (post.id == action.payload.id) {
          return true;
        }
        return false;
      });
      state.post[indexId] = action.payload;

      state.post = [...state.post];
    },
    [__editPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default postSlice.reducer;
