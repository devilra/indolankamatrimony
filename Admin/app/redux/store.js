import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./Slices/adminSlice";
import adminAuthReducer from "./Slices/adminAuthSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    adminAuth: adminAuthReducer,
  },
});
