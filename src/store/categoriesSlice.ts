import { createSlice } from "@reduxjs/toolkit";
import actGetCategories from "./actions/actGetCategories";
import { isString, type TCategory, type TError, type TLoading } from "@/types/";
type categoriesState = {
  records: TCategory[];
  loading: TLoading;
  error: TError;
};

const initialState: categoriesState = {
  records: [],
  loading: "idle",
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    clearCategories: (state) => {
      state.records = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetCategories.pending, (state) => {
      ((state.loading = "pending"), (state.error = null));
    });
    builder.addCase(actGetCategories.fulfilled, (state, action) => {
      ((state.loading = "succeeded"), (state.records = action.payload));
    });
    builder.addCase(actGetCategories.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) state.error = action.payload;
    });
  },
});

export const { clearCategories } = categoriesSlice.actions;

export { actGetCategories };
export default categoriesSlice.reducer;
