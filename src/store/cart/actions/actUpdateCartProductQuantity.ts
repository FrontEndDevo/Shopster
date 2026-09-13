import type { RootState } from "@/store/redux";
import AxiosErrorHandler from "@/utils/AxiosErrorHandler";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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

      console.log(response);
      return {
        totalCartPrice: response.data.data.totalCartPrice,
        products: response.data.data.products,
      };
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  },
);

export default actUpdateCartProductQuantity;
