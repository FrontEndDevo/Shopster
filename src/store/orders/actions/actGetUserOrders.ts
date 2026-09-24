import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosErrorHandler from "@/utils/AxiosErrorHandler";
import type { RootState } from "../../redux";
import type { TOrderData } from "@/types";

const API_USER_ORDERS = import.meta.env.VITE_ECOMMERCE_API;

const actGetUserOrders = createAsyncThunk(
  "orders/actGetUserOrders",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { auth } = getState() as RootState;

    try {
      const response = await axios.get<TOrderData[]>(
        `${API_USER_ORDERS}/orders/user/${auth.userId}`,
        {
          headers: {
            token: auth.token,
          },
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  },
);

export default actGetUserOrders;
