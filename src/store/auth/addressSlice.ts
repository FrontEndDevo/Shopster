import { isString, type TError, type TLoading } from "@/types";
import type { TUserAddress } from "@/types/auth.types";
import { createSlice } from "@reduxjs/toolkit";
import actAddUserAddress from "../actions/actAddUserAddress";

type TAddressState = {
  shippingAddresses: TUserAddress[] | null;
  loading: TLoading;
  error: TError;
};

const initialState: TAddressState = {
  shippingAddresses: null,
  loading: "idle",
  error: null,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
  },
});

export { actAddUserAddress };

export default addressSlice.reducer;
