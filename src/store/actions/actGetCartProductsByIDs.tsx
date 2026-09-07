import type { RootState } from "../redux";
import axios from "axios";
import AxiosErrorHandler from "@/utils/AxiosErrorHandler";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TProductsResponse } from "@/types/products";

const API_PRODUCTS = import.meta.env.VITE_API_PRODUCTS_URL;

const actGetCartProductsByIDs = createAsyncThunk(
  "cart/actGetProductsByIDs",
  async (_, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue, getState } = thunkAPI;
    const { cart } = getState() as RootState;

    const itemsIDs = Object.keys(cart.items);

    if (!itemsIDs.length) return fulfillWithValue([]);
    // Since the API I'm dealing with doesn't support "Bulk Request", I'm forced to make multiple requests.
    try {
      // Prepare our promises:
      const requests = itemsIDs.map((id) =>
        axios.get<TProductsResponse>(`${API_PRODUCTS}/${id}`),
      );
      // Send requests parallel:
      const responses = await Promise.all(requests);
      // Extract the data in an array
      const products = responses.map((res) => res.data.data);

      return fulfillWithValue(products);
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  },
);

export default actGetCartProductsByIDs;
