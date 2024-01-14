import { createSlice } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  UpdateUser,
  verifyUser,
} from "./operations";

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
  state.isAuthenticated = false;
  state.userInfo = null;
};

const loadUserFromStorage = () => {
  try {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      return user;
    }
  } catch (error) {
    console.error("Error loading user from localStorage:", error);
  }
  return null;
};

const UserSlice = createSlice({
  name: "users",
  initialState: {
    user: loadUserFromStorage(),
    isAuthenticated: !!loadUserFromStorage(),
    isLoading: false,
    error: null,
    userInfo: null,
    message: "",
  },
  reducers: {
    setErrorNull: {
      reducer(state, action) {
        state.error = action.payload.error;
      },
      prepare(error) {
        return {
          payload: {
            error,
          },
        };
      },
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.userInfo = action.payload.user;
      })
      .addCase(registerUser.rejected, handleRejected)
      .addCase(verifyUser.rejected, handleRejected)
      .addCase(verifyUser.pending, handlePending)
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.message = action.payload;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.userInfo = action.payload.data.user;

        sessionStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, handleRejected)
      .addCase(logoutUser.pending, handlePending)
      .addCase(logoutUser.rejected, handleRejected)
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = null;
        state.userInfo = null;
        sessionStorage.removeItem("user");
      })
      .addCase(getUser.pending, handlePending)
      .addCase(getUser.rejected, handleRejected)
      .addCase(getUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
        state.userInfo = action.payload;
      })
      .addCase(UpdateUser.pending, handlePending)
      .addCase(UpdateUser.rejected, handleRejected)
      .addCase(UpdateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        state.userInfo = { ...state.userInfo, ...action.payload.data.user };
      });
  },
});
export const { setErrorNull } = UserSlice.actions;
export const userReducer = UserSlice.reducer;
