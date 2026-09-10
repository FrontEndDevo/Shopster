import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosErrorHandler from "@/utils/AxiosErrorHandler";
import type { TAuthSignUp, TUserResponse } from "@/types/auth.types";

const API_SIGNUP = import.meta.env.VITE_ECOMMERCE_API;

const actAuthRegister = createAsyncThunk(
  "auth/actAuthRegister",
  async (data: TAuthSignUp, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await axios.post<TUserResponse>(
        `${API_SIGNUP}/auth/signup`,
        data,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  },
);

export default actAuthRegister;
