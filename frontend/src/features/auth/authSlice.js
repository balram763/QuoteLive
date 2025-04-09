import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleLogin, handleOtpVerify, handleSignup } from "./authService";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
    isOtpStage: false,
    emailForOtp: null,
  },
  reducers: {
    logOut: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
    isloggedin: (state, action) => {
      state.user = action.payload;
    },
    setEmailForOtp: (state, action) => {
      state.emailForOtp = action.payload;
    },
    setOtpStage: (state, action) => {
      state.isOtpStage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(signupUser.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isOtpStage = true;
      })

      .addCase(signupUser.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.isLoading = false;
      })

      .addCase(verifyOtp.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.isOtpStage = false;
        state.emailForOtp = null;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.isLoading = false;
      });
  },
});

export const loginUser = createAsyncThunk(
  "LOGIN/AUTH",
  async (formData, thunkAPI) => {
    try {
      return await handleLogin(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const signupUser = createAsyncThunk(
  "SIGNUP/AUTH",
  async (formData, thunkAPI) => {
    try {
      thunkAPI.dispatch(setEmailForOtp(formData.email));
      const data = await handleSignup(formData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "VERIFY/OTP",
  async (otp, thunkAPI) => {
    try {
      const email = thunkAPI.getState().auth.emailForOtp;
      return await handleOtpVerify({ email, otp });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const { logOut, isloggedin, setEmailForOtp, setOtpStage } =
  authSlice.actions;
export default authSlice.reducer;
