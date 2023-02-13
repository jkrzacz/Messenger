import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user-slice";

const persistedState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState"))
  : undefined;

const store = configureStore({
  reducer: { user: userReducer },
  preloadedState: persistedState,
});

export default store;
