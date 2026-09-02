import { createSlice } from "@reduxjs/toolkit";
import actGetProducts from "./actions/actGetProducts";
import type { TProducts } from "../types/products";
import type { TLoading } from "../types/shared";
type productsState = {
  records: TProducts[];
  loading: TLoading;
  error: string | null;
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
      ((state.loading = "pending"), (state.error = null));
    });
    builder.addCase(actGetProducts.fulfilled, (state, action) => {
      ((state.loading = "succeeded"), (state.records = action.payload));
    });
    builder.addCase(actGetProducts.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

export const { productsCleanUp } = productsSlice.actions;

export { actGetProducts };
export default productsSlice.reducer;
