import { createSlice } from "@reduxjs/toolkit";
import actWishlistToggle from "../actions/actWishlistToggle";
import { isString, type TLoading, type TProducts } from "@/types";
import actGetWishlist from "../actions/actGetWishlist";
import { authLogout } from "../auth/authSlice";

type TWishlistSlice = {
  productsIds: number[];
  productsWithFullInfo: TProducts[];
  loading: TLoading;
  error: null | string;
};

const initialState: TWishlistSlice = {
  productsIds: [],
  productsWithFullInfo: [],
  loading: "idle",
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    clearWishlist: (state) => {
      state.productsWithFullInfo = [];
    },
  },
  extraReducers: (builder) => {
    // Add & Remove a product from wishlist:
    builder.addCase(actWishlistToggle.pending, (state) => {
      state.error = null;
    });
    builder.addCase(actWishlistToggle.fulfilled, (state, action) => {
      if (action.payload?.type === "add") {
        state.productsIds.push(action.payload.id);
      } else {
        state.productsIds = state.productsIds.filter(
          (el) => el !== action.payload?.id,
        );
        state.productsWithFullInfo = state.productsWithFullInfo.filter(
          (el) => el.id !== action.payload?.id,
        );
      }
      state.error = null;
    });
    builder.addCase(actWishlistToggle.rejected, (state, action) => {
      if (action.payload && typeof action.payload === "string")
        state.error = action.payload;
    });

    // Get Wishlist products:
    builder.addCase(actGetWishlist.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetWishlist.fulfilled, (state, action) => {
      state.loading = "succeeded";
      if (action.payload.dataType === "productsIds") {
        state.productsIds = action.payload.data as number[];
      } else {
        state.productsWithFullInfo = action.payload.data as TProducts[];
      }
    });
    builder.addCase(actGetWishlist.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) state.error = action.payload;
    });

    // When logout:
    builder.addCase(authLogout, (state) => {
      state.productsIds = [];
      state.productsWithFullInfo = [];
    });
  },
});

export const { clearWishlist } = wishlistSlice.actions;

export { actWishlistToggle, actGetWishlist };

export default wishlistSlice.reducer;
