import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { TProducts } from "../../types/products";

const actGetProductsByCatPrefix = createAsyncThunk(
  "products/actGetProductsByCatPrefix",
  async (prefix: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await axios.get<TProducts[]>("");

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      } else {
        return rejectWithValue("Unexepected error!");
      }
    }
  },
);

export default actGetProductsByCatPrefix;
