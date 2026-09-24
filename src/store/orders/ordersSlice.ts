import {
  isString,
  type TError,
  type TLoading,
  type TOrdersList,
} from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import actPlaceOrder from "../actions/actPlaceOrder";

type TOrdersState = {
  ordersList: TOrdersList | null;
  loading: TLoading;
  error: TError;
};

const initialState: TOrdersState = {
  ordersList: null,
  loading: "idle",
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    ordersInit: (state) => {
      state.loading = "idle";
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(actPlaceOrder.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actPlaceOrder.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.error = null;
      state.ordersList = action.payload;
    });
    builder.addCase(actPlaceOrder.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) state.error = action.payload;
    });
  },
});

export const { ordersInit } = ordersSlice.actions;

export { actPlaceOrder };

export default ordersSlice.reducer;
