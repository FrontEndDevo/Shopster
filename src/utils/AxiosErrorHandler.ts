import { isAxiosError } from "axios";

const AxiosErrorHandler = (error: unknown) => {
  if (isAxiosError(error)) {
    return error.response?.data.message || error.message;
  } else {
    return "Unexepected error!";
  }
};

export default AxiosErrorHandler;
