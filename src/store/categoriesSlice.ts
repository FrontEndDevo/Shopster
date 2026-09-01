import { createSlice } from "@reduxjs/toolkit";
import actGetCategories from "./actions/actGetCategories";
import type { TCategory } from "../types/category";
import type { TLoading } from "../types/shared";
type categoriesState = {
  records: TCategory[];
  loading: TLoading;
  error: string | null;
};

const initialState: categoriesState = {
  records: [],
  loading: "idle",
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actGetCategories.pending, (state) => {
      ((state.loading = "pending"), (state.error = null));
    });
    builder.addCase(actGetCategories.fulfilled, (state, action) => {
      ((state.loading = "succeeded"), (state.records = action.payload));
    });
    builder.addCase(actGetCategories.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

export const categoriesActions = categoriesSlice.actions;

export { actGetCategories };
export default categoriesSlice.reducer;
