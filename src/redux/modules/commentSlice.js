import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  post: [],
  // comment: [],
};

const accessToken = localStorage.getItem("Access_Token");
const refreshToken = localStorage.getItem("Refresh_Token");

export const __getPostDetail = createAsyncThunk(
  "comment/__getPostDetail",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`http://13.124.38.31/api/post/${payload}`, {
        headers: {
          "Content-Type": `application/json`,
          Authorization: accessToken,
          RefreshToken: refreshToken,
          "Cache-Control": "no-cache",
        },
      });
      console.log("__getPostDetail", data.data.data);
      // console.log("response", data);
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//comment 부분
export const __hartComment = createAsyncThunk(
  "post/__hartComment",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(
        `http://13.124.38.31/api/comment/likes/${payload}`,
        {
          headers: {
            "Content-Type": `application/json`,
            Authorization: accessToken,
            RefreshToken: refreshToken,
            "Cache-Control": "no-cache",
          },
        }
      );
      return console.log("response", data);
      // return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __addComment = createAsyncThunk(
  "comment/__addComment",
  // async 는 프로미스에 새로운 신문법이다. // 언제끝나는지 알려준다.
  async (payload, thunkAPI) => {
    try {
      //console.log(payload)
      // payload를 데이터를 넣어줄때까지 실행하지 하지않겠다. //비동기
      const data = await axios.post(
        `http://13.124.38.31/api/comment/${payload.id}`,
        // JSON.stringify(payload.comment),
        payload.comment,
        {
          headers: {
            "Content-Type": `application/json`,
            Authorization: accessToken,
            RefreshToken: refreshToken,
            "Cache-Control": "no-cache",
          },
        }
      );
      return console.log("response", data);
      // return thunkAPI.fulfillWithValue(payload.comment);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteComment = createAsyncThunk(
  "comment/__deleteComment",
  // async 는 프로미스에 새로운 신문법이다. // 언제끝나는지 알려준다.
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      // payload를 데이터를 넣어줄때까지 실행하지 하지않겠다. //비동기
      const data = await axios.delete(
        `http://13.124.38.31/api/comment/${payload}`,
        {
          headers: {
            "Content-Type": `application/json`,
            Authorization: accessToken,
            RefreshToken: refreshToken,
            "Cache-Control": "no-cache",
          },
        }
      );
      // console.log("페이로드",payload);
      return console.log("response", data);
      // return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __editComment = createAsyncThunk(
  "comment/__editComment",
  async (payload, thunkAPI) => {
    //console.log("payload",payload.id)
    try {
      console.log(payload);
      const data = await axios.put(
        `http://13.124.38.31/api/comment/${payload.id}`,
        JSON.stringify(payload.comment),
        {
          headers: {
            "Content-Type": `application/json`,
            Authorization: accessToken,
            RefreshToken: refreshToken,
            "Cache-Control": "no-cache",
          },
        }
      );
      return console.log("response", data);
      // return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState,

  reducers: {},
  extraReducers: {
    //__getPostDetail
    [__getPostDetail.pending]: (state) => {
      state.isLoading = true;
    },
    [__getPostDetail.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.post = action.payload;
      // console.log("state.post", state.post);
    },
    [__getPostDetail.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //comment 부분

    //__hartComment
    [__hartComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__hartComment.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [__hartComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //__addComment
    [__addComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__addComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.post.commentList.push(action.payload);
    },
    [__addComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //__deleteComment
    [__deleteComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.post.commentList = state.post.commentList.filter(
        (comment) => comment.commentId !== action.payload
      );
    },
    [__deleteComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //__editComment
    [__editComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__editComment.fulfilled]: (state, action) => {
      state.isLoading = false;

      const indexId = state.comment.findIndex((comment) => {
        if (comment.commentId == action.payload.id) {
          return true;
        }
        return false;
      });
      state.comment[indexId] = action.payload.comment;

      state.comment = [...state.comment];
    },
    [__editComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default commentSlice.reducer;
