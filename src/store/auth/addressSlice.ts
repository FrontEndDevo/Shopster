// Redux:
import { createSlice } from "@reduxjs/toolkit";

// Redux Actions:
import { authLogout } from "./authSlice";
import actAddUserAddress from "../actions/actAddUserAddress";
import actGetUserAddresses from "../actions/actGetUserAddresses";

// Types:
import { isString, type TError, type TLoading } from "@/types";
import type { TUserAddress } from "@/types/auth.types";

type TAddressState = {
  shippingAddresses: TUserAddress[];
  loading: TLoading;
  error: TError;
};

const initialState: TAddressState = {
  shippingAddresses: [],
  loading: "idle",
  error: null,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add user address:
    builder.addCase(actAddUserAddress.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actAddUserAddress.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.error = null;
      state.shippingAddresses = action.payload;
    });
    builder.addCase(actAddUserAddress.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) state.error = action.payload;
    });

    // Get user addresses:
    builder.addCase(actGetUserAddresses.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetUserAddresses.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.error = null;
      state.shippingAddresses = action.payload;
    });
    builder.addCase(actGetUserAddresses.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) state.error = action.payload;
    });

    // When logout:
    builder.addCase(authLogout, (state) => {
      state.loading = "idle";
      state.error = null;
      state.shippingAddresses = [];
    });
  },
});

export { actAddUserAddress, actGetUserAddresses };

export default addressSlice.reducer;
