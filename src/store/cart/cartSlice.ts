import { createSlice } from "@reduxjs/toolkit";
import type { TProducts } from "@/types/products";
import { getTotalCartQuantitySelector } from "../selectors";

interface ICartState {
  items: { [key: number]: number };
  productsWithFullInfo: TProducts[];
}

const initialState: ICartState = {
  items: {},
  productsWithFullInfo: [],
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
  },
});

export { getTotalCartQuantitySelector };

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
