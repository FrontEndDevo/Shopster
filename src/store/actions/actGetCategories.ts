import axios from "axios";
import AxiosErrorHandler from "@/utils/AxiosErrorHandler";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TCategoryResponse } from "@/types/category.types";

const API_CATEGORIES_URL = import.meta.env.VITE_ECOMMERCE_API;

const actGetCategories = createAsyncThunk(
  "categories/actGetCategories",
  async (_, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;

    try {
      const response = await axios.get<TCategoryResponse>(
        `${API_CATEGORIES_URL}/categories`,
        {
          signal,
        },
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  },
);

export default actGetCategories;
