import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import {
  getCaloriesPublic,
  getCaloriesPrivate,
  searchProducts,
  addProducts,
  deleteProduct,
  getDiaries,
} from "./operations";

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const DiarySlice = createSlice({
  name: "diary",
  initialState: {
    date: moment(new Date()).format("DD.MM.YYYY"),
    diaries: [],
    publicInfo: {},
    searchResults: [],
    searchQuery: "",
    isLoading: false,
    error: null,
  },
  reducers: {
    editDate: {
      reducer(state, action) {
        state.date = action.payload.date;
      },
      prepare(date) {
        return {
          payload: {
            date,
          },
        };
      },
    },
    setSearchResults: {
      reducer(state, action) {
        state.searchResults = action.payload.searchResults;
      },
      prepare(searchResults) {
        return {
          payload: {
            searchResults,
          },
        };
      },
    },
    setSearchQuery: {
      reducer(state, action) {
        state.searchQuery = action.payload.searchQuery;
      },
      prepare(searchQuery) {
        return {
          payload: {
            searchQuery,
          },
        };
      },
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCaloriesPublic.pending, handlePending)
      .addCase(getCaloriesPublic.fulfilled, (state, action) => {
        state.isLoading = false;
        state.publicInfo = action.payload.data;
        state.error = null;
      })
      .addCase(getCaloriesPublic.rejected, handleRejected)
      .addCase(getCaloriesPrivate.pending, handlePending)
      .addCase(getCaloriesPrivate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.diaries = [action.payload.data];
        state.error = null;
      })
      .addCase(getCaloriesPrivate.rejected, handleRejected)
      .addCase(searchProducts.pending, handlePending)
      .addCase(searchProducts.rejected, handleRejected)
      .addCase(searchProducts.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addProducts.pending, handlePending)
      .addCase(addProducts.rejected, handleRejected)
      .addCase(addProducts.fulfilled, (state, action) => {
        state.diaries = [action.payload.data];
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteProduct.pending, handlePending)
      .addCase(deleteProduct.rejected, handleRejected)
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.diaries = [action.payload.data];
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getDiaries.pending, handlePending)
      .addCase(getDiaries.rejected, handleRejected)
      .addCase(getDiaries.fulfilled, (state, action) => {
        state.diaries = action.payload.data;
        state.isLoading = false;
        state.error = null;
      });
  },
});
export const { editDate, setSearchResults, setSearchQuery } =
  DiarySlice.actions;
export const diaryReducer = DiarySlice.reducer;
