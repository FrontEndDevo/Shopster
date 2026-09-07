import axios from "axios";
import AxiosErrorHandler from "@/utils/AxiosErrorHandler";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TProductsResponse } from "@/types/products";

const WISHLISTAPI = import.meta.env.VITE_API_WISHLIST_URL;
const USER_TOKEN = import.meta.env.VITE_DEFAULT_USER_TOKEN;

const actGetWishlist = createAsyncThunk(
  "wishlist/actGetWishlist",
  async (_, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;

    try {
      const response = await axios.get<TProductsResponse>(WISHLISTAPI, {
        headers: {
          token: USER_TOKEN,
        },
        signal,
      });

      return response.data.data;
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  },
);

export default actGetWishlist;
