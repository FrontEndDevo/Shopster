import { isString, type TError, type TLoading } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import actAuthRegister from "../actions/actAuthRegister";
import actAuthLogin from "../actions/actAuthLogin";
import type { TUser, TUserToken } from "@/types/auth.types";

type TAuthState = {
  user: TUser | null;
  token: TUserToken;
  loading: TLoading;
  error: TError;
};

const initialState: TAuthState = {
  user: null,
  token: null,
  loading: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuth: (state) => {
      state.error = null;
      state.loading = "idle";
    },

    authLogout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
  // Sign Up
  extraReducers: (builder) => {
    builder.addCase(actAuthRegister.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actAuthRegister.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.error = null;
      state.token = action.payload.token;
      state.user = action.payload.user;
    });
    builder.addCase(actAuthRegister.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) state.error = action.payload;
    });

    // Login
    builder.addCase(actAuthLogin.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actAuthLogin.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.error = null;
      state.token = action.payload.token;
      state.user = action.payload.user;
    });
    builder.addCase(actAuthLogin.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) state.error = action.payload;
    });
  },
});

export const { clearAuth, authLogout } = authSlice.actions;

export { actAuthRegister, actAuthLogin };

export default authSlice.reducer;
