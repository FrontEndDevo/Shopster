import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USER_TOKEN = import.meta.env.VITE_DEFAULT_USER_TOKEN;

type TWishlistProps = {
  id: number;
  type: string;
};

const actWishlistToggle = createAsyncThunk(
  "wishlist/actWishlistToggle",
  async ({ id, type }: TWishlistProps, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      if (type === "add") {
        const response = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/wishlist",
          {
            productId: id,
          },
          {
            headers: {
              token: USER_TOKEN,
            },
          },
        );

        if (response.data) return { id, type: "add" };
      } else {
        const response = await axios.delete(
          `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
          {
            headers: {
              token: USER_TOKEN,
            },
          },
        );

        if (response.data) return { id, type: "remove" };
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      } else {
        return rejectWithValue("Unexepected error!");
      }
    }
  },
);

export default actWishlistToggle;
