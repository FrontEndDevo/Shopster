// Axios:
import axios from "axios";
import AxiosErrorHandler from "@/utils/AxiosErrorHandler";

// Redux:
import type { RootState } from "../redux";
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_ORDERS = import.meta.env.VITE_ECOMMERCE_API_VERSION_2;

const actPlaceOrder = createAsyncThunk(
  "orders/actPlaceOrder",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState, signal } = thunkAPI;

    const { cart, address, auth } = getState() as RootState;

    try {
      const response = await axios.post(
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

      return response.data.data;
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  },
);

export default actPlaceOrder;
