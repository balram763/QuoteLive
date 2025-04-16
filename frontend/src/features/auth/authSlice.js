import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleLogin, handleOtpVerify, handleSignup } from "./authService";
import { io } from "socket.io-client";

// const BaseUrl = "http://localhost:8080";
const BaseUrl = "https://quotelive.onrender.com";

let socketState = null;
// console.log(socketState)

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
    // socket: null,
    onlineUser : []
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
    // connectSocket:,
    disconnectSocket: (state) => {
      if (state.user && socketState) {
        socketState.disconnect();
        socketState = null;
      }
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
      })
      // .addCase(connectSocket,(state,action)=>{
      //   state.socket = action.payload || null
      // })
      .addCase(onlineUsers.fulfilled,(state,action)=>{
        state.onlineUser = action.payload || []
      })
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

//connectSocket
export const connectSocket = createAsyncThunk("SOCKET/AUTH", async(_,thunkAPI) => {
  const user = thunkAPI.getState().auth.user

  if (user && !socketState) {
    const socket = io(BaseUrl, {
      query: {
        userId: user?._id,
      },
    });
    socket.connect();
    socketState = socket;

    socket.on("getOnlineUser", (users) => {
      thunkAPI.dispatch(onlineUsers.fulfilled(users));
    });

    // return socket;
  }

});

export const onlineUsers = createAsyncThunk("AUTH/ONLINE", async (_, thunkAPI) => {
  return new Promise((resolve, reject) => {
    if (!socketState) return reject("Socket not connected");

    socketState.on("getOnlineUser", (users) => {
      resolve(users);
    });

    setTimeout(() => reject("Timeout getting online users"), 5000);
  });
});

export const getSocketState = () => socketState;


export const {
  logOut,
  isloggedin,
  setEmailForOtp,
  setOtpStage,
  disconnectSocket,
} = authSlice.actions;
export default authSlice.reducer;
