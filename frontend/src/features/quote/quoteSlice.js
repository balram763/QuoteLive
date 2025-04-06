import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../hooks/axiosConfig";

const quoteSlice = createSlice({
  name: "quote",
  initialState: {
    quotes: [],
    singleUser: {},
    favorites: [],
    profile: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  reducers: {
    handleSingleQuote: (state, action) => {
      if (action.payload) {
        state.quotes = state.quotes.map((prev) =>
          prev._id === action.payload._id ? action.payload : prev
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuote.fulfilled, (state, action) => {
        state.quotes = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(fetchQuote.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(fetchQuote.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(fetchUser.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })

      .addCase(fetchUser.fulfilled, (state, action) => {
        state.singleUser = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(postQuote.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.quotes = action.payload;
      })
      .addCase(postQuote.pending, (state, action) => {
        state.isLoading = true 
        state.isError = false
        state.isSuccess = false
      })
      .addCase(postQuote.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(fetchFavorite.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profile = action.payload
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
      })
      .addCase(fetchProfile.pending, (state, action) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateProfile.fulfilled,(state,action)=>{
        state.profile = action.payload
      })
  },
});

export const { handleSingleQuote } = quoteSlice.actions;

export const postQuote = createAsyncThunk(
  "POST/QUOTE",
  async ({ text, category }, thunkAPI) => {
    // console.log({ text, category });
    const token = thunkAPI.getState().auth.user?.token;
    const response = await axiosInstance.post(
      "api/quotes",
      { text, category },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  }
);
export const fetchQuote = createAsyncThunk(
  "FETCH/QUOTE",
  async (_, thunkAPI) => {
    const response = await axiosInstance.get("/api/quotes");
    return response.data;
  }
);

export const fetchUser = createAsyncThunk(
  "USER/QUOTE",
  async (id, thunkAPI) => {
    const response = await axiosInstance.get(`/api/users/${id}`);
    console.log(response.data);
    return response.data;
  }
);
export const fetchProfile = createAsyncThunk(
  "USER/PROFILE",
  async (token, thunkAPI) => {
    const response = await axiosInstance.get(`/api/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  }
);

export const fetchFavorite = createAsyncThunk(
  "FETCH/FAV",
  async (token, thunkAPI) => {
    console.log(token);
    const response = await axiosInstance.get("/api/favorites", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.quotes;
  }
);


export const updateProfile = createAsyncThunk(
  "UPDATE/AUTH",
  async (formData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    console.log(token);

    try{
      const response = await axiosInstance.put("/api/users/update", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
  
    }catch(error){
      toast.error("something went wrong")
    }
  }
);



export default quoteSlice.reducer;
