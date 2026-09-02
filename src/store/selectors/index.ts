import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../redux";

// A Selector to calculate the total quantity of items in the cart (using it in cartSlice.ts):
export const getTotalCartQuantitySelector = createSelector(
  (state: RootState) => state.cart.items,
  (items) => {
    const totalQuantity = Object.values(items).reduce((acc, curr) => {
      return acc + curr;
    }, 0);
    return totalQuantity;
  },
);
