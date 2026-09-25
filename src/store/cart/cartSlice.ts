// Redux:
import { createSlice } from "@reduxjs/toolkit";
import { getTotalCartQuantitySelector } from "../selectors";

// Redux Actions:
import actAddProductToCart from "./actions/actAddProductToCart";
import actGetLoggedUserCart from "./actions/actGetLoggedUserCart";
import actClearUserCart from "./actions/actClearUserCart";
import actRemoveProductFromCart from "./actions/actRemoveProductFromCart";
import actUpdateCartProductQuantity from "./actions/actUpdateCartProductQuantity";

// Types:
import { isString, type TError, type TLoading, type TCartItem } from "@/types";

interface ICartState {
  items: { [key: string]: number };
  cartId: string | null;
  productsWithFullInfo: TCartItem;
  loading: TLoading;
  error: TError;
}

const initialState: ICartState = {
  items: {},
  cartId: null,
  productsWithFullInfo: {
    totalCartPrice: 0,
    products: [],
  },
  loading: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add product to cart:
    builder.addCase(actAddProductToCart.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });

    builder.addCase(actAddProductToCart.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.cartId = action.payload.cartId;
      state.productsWithFullInfo.totalCartPrice = action.payload.totalCartPrice;
      state.productsWithFullInfo.products = action.payload.products;
    });

    builder.addCase(actAddProductToCart.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) state.error = action.payload;
    });

    // Remove product from cart:
    builder.addCase(actRemoveProductFromCart.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });

    builder.addCase(actRemoveProductFromCart.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.cartId = action.payload.cartId;
      state.productsWithFullInfo.totalCartPrice = action.payload.totalCartPrice;
      state.productsWithFullInfo.products = action.payload.products;
    });

    builder.addCase(actRemoveProductFromCart.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) state.error = action.payload;
    });

    // Get logged user products in the cart:
    builder.addCase(actGetLoggedUserCart.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });

    builder.addCase(actGetLoggedUserCart.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.cartId = action.payload.cartId;
      state.productsWithFullInfo.totalCartPrice = action.payload.totalCartPrice;
      state.productsWithFullInfo.products = action.payload.products;
    });

    builder.addCase(actGetLoggedUserCart.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) state.error = action.payload;
    });

    // Update Cart Product Quantity:
    builder.addCase(actUpdateCartProductQuantity.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });

    builder.addCase(actUpdateCartProductQuantity.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.cartId = action.payload.cartId;
      state.productsWithFullInfo.totalCartPrice = action.payload.totalCartPrice;
      state.productsWithFullInfo.products = action.payload.products;
    });

    builder.addCase(actUpdateCartProductQuantity.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) state.error = action.payload;
    });

    // Clear user cart:
    builder.addCase(actClearUserCart.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });

    builder.addCase(actClearUserCart.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.cartId = action.payload.cartId;
      state.productsWithFullInfo.totalCartPrice = action.payload.totalCartPrice;
      state.productsWithFullInfo.products = action.payload.products;
    });

    builder.addCase(actClearUserCart.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) state.error = action.payload;
    });
  },
});

export {
  getTotalCartQuantitySelector,
  actAddProductToCart,
  actRemoveProductFromCart,
  actUpdateCartProductQuantity,
  actGetLoggedUserCart,
  actClearUserCart,
};

export default cartSlice.reducer;
