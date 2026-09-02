import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { TCategory } from "@/types/category";

const actGetCategories = createAsyncThunk(
  "categories/actGetCategories",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await axios.get<TCategory[]>("");

      // return response.data;
      return [
        { title: "men", img: "" },
        { title: "women", img: "" },
        { title: "kids", img: "" },
      ];
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      } else {
        return rejectWithValue("Unexepected error!");
      }
    }
  },
);

export default actGetCategories;
