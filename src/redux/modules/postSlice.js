import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const accessToken = localStorage.getItem("Access_Token");
const refreshToken = localStorage.getItem("Refresh_Token");

export const __getmelon = createAsyncThunk(
  "post/__getmelon",
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

export const __addMelon = createAsyncThunk(
  "post/__addMelon",
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

export const __deleteMelon = createAsyncThunk(
  "post/__deleteMelon",
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

export const __editMelon = createAsyncThunk(
  "post/__editMelon",
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
    //__getmelon
    [__getmelon.pending]: (state) => {
      state.isLoading = true;
    },
    [__getmelon.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.melon = action.payload;
    },
    [__getmelon.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //__addMelon
    [__addMelon.pending]: (state) => {
      state.isLoading = true;
    },
    [__addMelon.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.melon = action.payload;
    },
    [__addMelon.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //__deleteMelon
    [__deleteMelon.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteMelon.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.melon = state.melon.filter((melon) => melon.id !== action.payload);
    },

    [__deleteMelon.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //__editMelon
    [__editMelon.pending]: (state) => {
      state.isLoading = true;
    },
    [__editMelon.fulfilled]: (state, action) => {
      state.isLoading = false;

      const indexId = state.melon.findIndex((melon) => {
        if (melon.id == action.payload.id) {
          return true;
        }
        return false;
      });
      state.melon[indexId] = action.payload;

      state.melon = [...state.melon];
    },
    [__editMelon.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default postSlice.reducer;
