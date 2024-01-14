import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  registerApi,
  loginApi,
  logoutApi,
  getCurrentUserApi,
  updateCurrentUserApi,
  getCaloriesPublicApi,
  getCaloriesAndSaveApi,
  searchProductsApi,
  addProductsToDiaryApi,
  deleteProductApi,
  getDiariesApi,
  verifyAccountApi,
  resendVerificationCodeApi,
} from "../API/API.js";

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (user, thunkAPI) => {
    try {
      const response = await registerApi(user);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const verifyUser = createAsyncThunk(
  "users/verify",
  async (verificationId, thunkAPI) => {
    try {
      const response = await verifyAccountApi(verificationId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const resendVerifyUser = createAsyncThunk(
  "users/resendVerify",
  async (email, thunkAPI) => {
    try {
      const response = await resendVerificationCodeApi(email);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (user, thunkAPI) => {
    try {
      const response = await loginApi(user);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
export const logoutUser = createAsyncThunk(
  "users/logoutUser",
  async (token, thunkAPI) => {
    try {
      const response = await logoutApi(token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const getUser = createAsyncThunk(
  "users/getUser",
  async (token, thunkAPI) => {
    try {
      const response = await getCurrentUserApi(token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const UpdateUser = createAsyncThunk(
  "users/updateUser",
  async ({ token, name }, thunkAPI) => {
    try {
      const response = await updateCurrentUserApi(token, name);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const getCaloriesPublic = createAsyncThunk(
  "diary/getCaloriesPublic",
  async (inputData, thunkAPI) => {
    try {
      const response = await getCaloriesPublicApi(inputData);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCaloriesPrivate = createAsyncThunk(
  "diary/getCaloriesPrivate",
  async ({ token, inputData }, thunkAPI) => {
    try {
      const response = await getCaloriesAndSaveApi(token, inputData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const searchProducts = createAsyncThunk(
  "diary/searchProducts",
  async ({ token, query }, thunkAPI) => {
    try {
      const response = await searchProductsApi(token, query);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addProducts = createAsyncThunk(
  "diary/addProducts",
  async ({ token, userSelection }, thunkAPI) => {
    try {
      const response = await addProductsToDiaryApi(token, userSelection);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const deleteProduct = createAsyncThunk(
  "diary/deleteProducts",
  async ({ token, productId, selectedDate }, thunkAPI) => {
    try {
      const response = await deleteProductApi(token, productId, selectedDate);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getDiaries = createAsyncThunk(
  "diary/getDiaries",
  async (token, thunkAPI) => {
    try {
      const response = await getDiariesApi(token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
