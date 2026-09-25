// Axios:
import axios from "axios";
import AxiosErrorHandler from "@/utils/AxiosErrorHandler";

// Redux:
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../redux";

// Types:
import type { TCartItemResponse } from "@/types/products.types";

const API_CART_PRODUCT = import.meta.env.VITE_ECOMMERCE_API_VERSION_2;

const actClearUserCart = createAsyncThunk(
  "cart/actClearUserCart",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { auth } = getState() as RootState;

    try {
      const response = await axios.delete<TCartItemResponse>(
        `${API_CART_PRODUCT}/cart`,
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

export default actClearUserCart;
