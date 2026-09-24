import { isString, type TError, type TLoading, type TOrderData } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import actPlaceOrder from "../actions/actPlaceOrder";
import actGetUserOrders from "./actions/actGetUserOrders";

type TOrdersState = {
  ordersList: TOrderData[] | null;
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
    // Place an order:
    builder.addCase(actPlaceOrder.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actPlaceOrder.fulfilled, (state) => {
      state.loading = "succeeded";
      state.error = null;
    });
    builder.addCase(actPlaceOrder.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) state.error = action.payload;
    });

    // Get all user orders:
    builder.addCase(actGetUserOrders.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetUserOrders.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.error = null;
      state.ordersList = action.payload;
    });
    builder.addCase(actGetUserOrders.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) state.error = action.payload;
    });
  },
});

export const { ordersInit } = ordersSlice.actions;

export { actPlaceOrder, actGetUserOrders };

export default ordersSlice.reducer;
