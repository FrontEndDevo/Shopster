import { createSlice } from "@reduxjs/toolkit";
import { isString, type TError, type TLoading, type TProducts } from "../types";
import actGetProducts from "./actions/actGetProducts";

type productsState = {
  records: TProducts[];
  loading: TLoading;
  error: TError;
};

const initialState: productsState = {
  records: [],
  loading: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productsCleanUp: (state) => {
      state.records = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetProducts.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetProducts.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload;
    });
    builder.addCase(actGetProducts.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) state.error = action.payload;
    });
  },
});

export const { productsCleanUp } = productsSlice.actions;

export { actGetProducts };
export default productsSlice.reducer;
