import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  token: "",
  refreshToken: "",
  id: null,
  username: null,
  isAdmin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.access_token;
      state.refreshToken = action.payload.refresh_token;
    },
    logout(state, action) {
      state.isLoggedIn = false;
      state.token = "";
      state.id = null;
      state.username = null;
      state.isAdmin = false;
      state.refreshToken = "";
      localStorage.clear();
    },
    setUserInfo(state, action) {
      state.id = action.payload.id;
      state.username = action.payload.name;
      state.isAdmin = action.payload.is_admin;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
