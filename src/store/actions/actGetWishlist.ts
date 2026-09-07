import type { TProductsResponse } from "@/types/products";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const WISHLISTAPI = import.meta.env.VITE_API_WISHLIST_URL;
const USER_TOKEN = import.meta.env.VITE_DEFAULT_USER_TOKEN;

const actGetWishlist = createAsyncThunk(
  "wishlist/actGetWishlist",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await axios.get<TProductsResponse>(WISHLISTAPI, {
        headers: {
          token: USER_TOKEN,
        },
      });

      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      } else {
        return rejectWithValue("Unexepected error!");
      }
    }
  },
);

export default actGetWishlist;
