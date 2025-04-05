import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleLogin, handleSignup } from "./authService";
import toast from "react-hot-toast";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  reducers: {
    logOut: (state, action) => {
      state.user = null;
      localStorage.removeItem("user");
    },
    isloggedin: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isError = false;
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.isError = false;
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(signupUser.pending, (state, action) => {
        state.isError = false;
        state.isLoading = true;
        state.fulfilled = false;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
        state.isLoading = false;
      }),
});

export const loginUser = createAsyncThunk(
  "LOGIN/AUTH",
  async (formData, thunkAPI) => {
    try {
      return await handleLogin(formData);
    } catch (error) {
      console.log(error);
    }
  }
);

export const signupUser = createAsyncThunk(
  "SIGNUP/AUTH",
  async (formData, thunkAPI) => {
    try {
      console.log(formData);
      return await handleSignup(formData);
    } catch (error) {
      toast.error("something went wrong");
    }
  }
);

export const { logOut, isloggedin } = authSlice.actions;

export default authSlice.reducer;
