import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  post: [],
  // comment: [],
  ModalDetail: false,
};

const accessToken = localStorage.getItem("Access_Token");
const refreshToken = localStorage.getItem("Refresh_Token");
console.log(accessToken);
console.log(refreshToken);

export const __heartPost = createAsyncThunk(
  "post/__heartPost",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`http://13.124.38.31/api/likes/${payload}`, {
        headers: {
          "Content-Type": `application/json`,
          Authorization: accessToken,
          RefreshToken: refreshToken,
          "Cache-Control": "no-cache",
        },
      });
      console.log("response", data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getPost = createAsyncThunk(
  "post/__getPost",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`http://13.124.38.31/api/post`, {
        headers: {
          "Content-Type": `application/json`,
          Authorization: accessToken,
          RefreshToken: refreshToken,
          "Cache-Control": "no-cache",
        },
      });
      // console.log("data", data);
      console.log("__getPost", data);
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __addPost = createAsyncThunk(
  "post/__addPost",
  async (payload, thunkAPI) => {
    try {
      await axios
        .post(
          `http://13.124.38.31/api/post`,
          payload,
          // {
          //   headers: {
          //     "Content-Type": `application/json`,
          //     Authorization: accessToken,
          //     RefreshToken: refreshToken,
          //     "Cache-Control": "no-cache",
          //   },
          // }
          {
            headers: {
              enctype: "multipart/form-data",
              Authorization: accessToken,
              RefreshToken: refreshToken,
              "Cache-Control": "no-cache",
            },
          }
        )
        .then((response) => {
          console.log("response", response);
          return thunkAPI.fulfillWithValue(response.data.data);
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
        `http://13.124.38.31/api/post/${payload}`,
        {
          headers: {
            "Content-Type": `application/json`,
            Authorization: accessToken,
            RefreshToken: refreshToken,
            "Cache-Control": "no-cache",
          },
        }
      );
      console.log("response", data);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      console.log("error", error);
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
        `http://13.124.38.31/api/post/${payload.postId}`,
        payload.formData,
        {
          headers: {
            // "Content-Type": `application/json`,
            enctype: "multipart/form-data",
            Authorization: accessToken,
            RefreshToken: refreshToken,
            "Cache-Control": "no-cache",
          },
        }
      );
      // console.log("data", data.data);
      console.log("response", data);
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,

  reducers: {
    _ModalDetail(state, action) {
      state.ModalDetail = action.payload;
    },
  },
  extraReducers: {
    //__heartPost
    [__heartPost.pending]: (state) => {
      state.isLoading = true;
    },
    [__heartPost.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [__heartPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
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
      state.post.push(action.payload);
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
      state.post = state.post.filter((post) => post.postId !== action.payload);
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
        if (post.postId == action.payload.postId) {
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

export const { _ModalDetail } = postSlice.actions;
export default postSlice.reducer;
