// Axios:
import axios from "axios";
import AxiosErrorHandler from "@/utils/AxiosErrorHandler";

// Redux:
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../redux";

// Types:
import type { TProductsResponse } from "@/types";

const WISHLISTAPI = import.meta.env.VITE_ECOMMERCE_API;

type TDataType = "productsIds" | "productsWithFullInfo";

const actGetWishlist = createAsyncThunk(
  "wishlist/actGetWishlist",
  async (dataType: TDataType, thunkAPI) => {
    const { rejectWithValue, signal, getState } = thunkAPI;
    const { auth } = getState() as RootState;

    try {
      const response = await axios.get<TProductsResponse>(
        `${WISHLISTAPI}/wishlist`,
        {
          headers: {
            token: auth.token,
          },
          signal,
        },
      );

      // Check if there are any products in the wishlist when loading Header component or not.
      if (response.data.data.length === 0)
        return { data: [], dataType: "empty" };

      // To load the total products in the wishlist and render it when the Header component amount.
      if (dataType === "productsIds") {
        const concateProductsIds = response.data.data.map((el) => el.id);
        return { data: concateProductsIds, dataType: "productsIds" };
      } else {
        return { data: response.data.data, dataType: "productsWithFullInfo" };
      }
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  },
);

export default actGetWishlist;
