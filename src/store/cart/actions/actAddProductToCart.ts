import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosErrorHandler from "@/utils/AxiosErrorHandler";
import type { RootState } from "../../redux";

const API_CART_PRODUCT = import.meta.env.VITE_ECOMMERCE_API_VERSION_2;

const actAddProductToCart = createAsyncThunk(
  "cart/actAddProductToCart",
  async (productId: string, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { auth } = getState() as RootState;

    try {
      const response = await axios.post(
        `${API_CART_PRODUCT}/cart`,
        { productId },
        {
          headers: {
            token: auth.token,
          },
        },
      );

      return {
        products: response.data.data.products,
        totalCartPrice: response.data.data.totalCartPrice,
      };
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  },
);

export default actAddProductToCart;
