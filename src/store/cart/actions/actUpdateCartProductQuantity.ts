// Axios:
import axios from "axios";
import AxiosErrorHandler from "@/utils/AxiosErrorHandler";

// Redux:
import type { RootState } from "@/store/redux";

// Types:
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_UPDATE_CART = import.meta.env.VITE_ECOMMERCE_API_VERSION_2;

type TUpdateCart = {
  productId: string;
  amount: number;
};

const actUpdateCartProductQuantity = createAsyncThunk(
  "cart/actUpdateCartProductQuantity",
  async ({ productId, amount }: TUpdateCart, { rejectWithValue, getState }) => {
    const { auth } = getState() as RootState;

    try {
      const response = await axios.put(
        `${API_UPDATE_CART}/cart/${productId}`,
        { count: amount },
        {
          headers: {
            token: auth.token,
          },
        },
      );

      return {
        cartId: response.data.cartId,
        totalCartPrice: response.data.data.totalCartPrice,
        products: response.data.data.products,
      };
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  },
);

export default actUpdateCartProductQuantity;
