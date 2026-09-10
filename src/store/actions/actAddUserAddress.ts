import AxiosErrorHandler from "@/utils/AxiosErrorHandler";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../redux";
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
      console.log(response.data.data);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  },
);

export default actAddUserAddress;
