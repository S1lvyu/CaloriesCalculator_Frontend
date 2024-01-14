import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userSlice";
import { diaryReducer } from "./DiarySlice";

import { modalReducer } from "./ModalSlice";
export const store = configureStore({
  reducer: {
    users: userReducer,
    diary: diaryReducer,
    modal: modalReducer,
  },
});
