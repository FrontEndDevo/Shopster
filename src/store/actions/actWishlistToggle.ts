// Axios:
import axios from "axios";
import AxiosErrorHandler from "@/utils/AxiosErrorHandler";

// Redux:
import type { RootState } from "../redux";
import { createAsyncThunk } from "@reduxjs/toolkit";

type TWishlistProps = {
  id: number;
  type: string;
};

const actWishlistToggle = createAsyncThunk(
  "wishlist/actWishlistToggle",
  async ({ id, type }: TWishlistProps, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { auth } = getState() as RootState;

    try {
      if (type === "add") {
        const response = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/wishlist",
          {
            productId: id,
          },
          {
            headers: {
              token: auth.token,
            },
          },
        );

        if (response.data) return { id, type: "add" };
      } else {
        const response = await axios.delete(
          `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
          {
            headers: {
              token: auth.token,
            },
          },
        );

        if (response.data) return { id, type: "remove" };
      }
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  },
);

export default actWishlistToggle;
