import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../redux";

// A Selector to calculate the total quantity of items in the cart (using it in cartSlice.ts):
export const getTotalCartQuantitySelector = createSelector(
  (state: RootState) => state.cart.productsWithFullInfo.products,
  (products) => products.reduce((total, product) => total + product.count, 0),
);
