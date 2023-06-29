import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LoginResponseModel, LoggedInModel} from "../models/auth/login-model";
import {getAuthUser, removeAuthUser} from "../helpers/local-storage-service";

import store, {AppState} from "../store";

export const logginOut = () => {
  removeAuthUser();
  store.dispatch(logout());
};

const initialState: LoggedInModel = getAuthUser();

const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginResponseModel>) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.logged = true;
    },
    logout: (state) => {
      state.email = null;
      state.token = null;
      state.logged = false;
    },
  },
});

export const selectAuth = (state: AppState) => state.auth;

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;
