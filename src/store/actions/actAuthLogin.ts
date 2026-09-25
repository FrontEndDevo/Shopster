// Axios:
import axios from "axios";
import AxiosErrorHandler from "@/utils/AxiosErrorHandler";

// Redux:
import { createAsyncThunk } from "@reduxjs/toolkit";

// Types:
import type { TAuthLogin, TUserResponse } from "@/types/auth.types";

// Utilities:
import TokenToId from "@/utils/TokenToId";

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

      let userId;
      if (response.data.token) userId = TokenToId(response.data.token);

      return { token: response.data.token, user: response.data.user, userId };
    } catch (error) {
      return rejectWithValue(AxiosErrorHandler(error));
    }
  },
);

export default actAuthLogin;
