import { createSlice } from "@reduxjs/toolkit";
import type { TLoading, TProducts } from "@/types";
import { getTotalCartQuantitySelector } from "../selectors";
import actGetCartProductsByIDs from "../actions/actGetCartProductsByIDs";

interface ICartState {
  items: { [key: string]: number };
  productsWithFullInfo: TProducts[];
  loading: TLoading;
  error: string | null;
}

const initialState: ICartState = {
  items: {},
  productsWithFullInfo: [],
  loading: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemId = action.payload;
      if (state.items[itemId]) {
        state.items[itemId]++;
      } else {
        state.items[itemId] = 1;
      }
    },
    removeFromCart: (state, action) => {
      delete state.items[action.payload];
      state.productsWithFullInfo = state.productsWithFullInfo.filter(
        (el) => el.id !== action.payload,
      );
    },
    clearCart: (state) => {
      state.productsWithFullInfo = [];
    },

    incrementQuantity: (state, action) => {
      const id = String(action.payload);

      // Update the product amount in the items first.
      if (state.items[id] !== undefined) {
        state.items[id] += 1;
      } else {
        state.items[id] = 1;
      }

      // Update the product amount in the productsWithFullInfo.
      const item = state.productsWithFullInfo.find(
        (el) => String(el.id) === id,
      );
      if (item) {
        item.amount = (item.amount ?? 0) + 1;
      }
    },
    decrementQuantity: (state, action) => {
      const id = String(action.payload);
      const item = state.productsWithFullInfo.find(
        (el) => String(el.id) === id,
      );

      if (item) {
        const currentAmount = item.amount ?? 1;

        if (currentAmount > 1) {
          // Decrement 1 from items & productsWithFullInfo:
          item.amount = currentAmount - 1;
          if (state.items[id]) {
            state.items[id] -= 1;
          }
        } else {
          // Delete the product from items & productsWithFullInfo:
          delete state.items[id];
          state.productsWithFullInfo = state.productsWithFullInfo.filter(
            (el) => String(el.id) !== id,
          );
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetCartProductsByIDs.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });

    builder.addCase(actGetCartProductsByIDs.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.productsWithFullInfo = action.payload;
    });

    builder.addCase(actGetCartProductsByIDs.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string")
        state.error = action.payload;
    });
  },
});

export { getTotalCartQuantitySelector, actGetCartProductsByIDs };

export const {
  addToCart,
  removeFromCart,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
