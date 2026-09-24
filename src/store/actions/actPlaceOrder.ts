import type { RootState } from "../redux";
import axios from "axios";
import AxiosErrorHandler from "@/utils/AxiosErrorHandler";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TOrdersList } from "@/types/orders.types";

const API_ORDERS = import.meta.env.VITE_ECOMMERCE_API_VERSION_2;

const actPlaceOrder = createAsyncThunk(
  "orders/actPlaceOrder",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState, signal } = thunkAPI;

    const { cart, address, auth } = getState() as RootState;

    try {
      const response = await axios.post<TOrdersList>(
        `${API_ORDERS}/orders/${cart.cartId}`,
        {
          shippingAddress: {
            details: address.shippingAddresses[0].details,
            phone: address.shippingAddresses[0].phone,
            city: address.shippingAddresses[0].city,
          },
        },
        {
          headers: {
            token: auth.token,
          },
          signal,
        },
      );

      return {
        data: response.data.data,
        pricing: response.data.pricing,
      };
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  },
);

export default actPlaceOrder;
