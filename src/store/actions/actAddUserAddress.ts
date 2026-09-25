// Axios:
import axios from "axios";
import AxiosErrorHandler from "@/utils/AxiosErrorHandler";

// Redux:
import type { RootState } from "../redux";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Types:
import type { TUserAddress } from "@/types/auth.types";

const ADDRESS_API = import.meta.env.VITE_ECOMMERCE_API;

const actAddUserAddress = createAsyncThunk(
  "address/actAddUserAddress",
  async (data: TUserAddress, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { auth } = getState() as RootState;

    try {
      const response = await axios.post(`${ADDRESS_API}/addresses`, data, {
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

export default actAddUserAddress;
