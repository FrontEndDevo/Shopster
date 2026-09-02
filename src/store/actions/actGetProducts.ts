import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { TProducts } from "@/types/products";

const API_PRODUCTS_URL = import.meta.env.VITE_API_PRODUCTS_URL;

type TProductsResponse = {
  data: TProducts[];
};

const actGetProducts = createAsyncThunk(
  "products/actGetProducts",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get<TProductsResponse>(API_PRODUCTS_URL);

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

export default actGetProducts;
