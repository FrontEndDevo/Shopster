import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosErrorHandler from "@/utils/AxiosErrorHandler";
import type { TAuthLogin, TUserResponse } from "@/types/auth.types";

const API_LOGIN = import.meta.env.VITE_ECOMMERCE_API;

const actAuthLogin = createAsyncThunk(
  "auth/actAuthLogin",
  async (data: TAuthLogin, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await axios.post<TUserResponse>(
        `${API_LOGIN}/auth/signin`,
        data,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  },
);

export default actAuthLogin;
