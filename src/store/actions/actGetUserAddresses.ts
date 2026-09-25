// Axios:
import axios from "axios";
import AxiosErrorHandler from "@/utils/AxiosErrorHandler";

// Redux:
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../redux";

const ADDRESS_API = import.meta.env.VITE_ECOMMERCE_API;

const actGetUserAddresses = createAsyncThunk(
  "address/actGetUserAddresses",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { auth } = getState() as RootState;

    try {
      const response = await axios.get(`${ADDRESS_API}/addresses`, {
        headers: {
          token: auth.token,
        },
      });

      return response.data.data;
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  },
);

export default actGetUserAddresses;
