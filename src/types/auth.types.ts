// Login
export type TAuthLogin = {
  email: string;
  password: string;
};
// Register
export type TAuthSignUp = {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  terms?: boolean;
};

// User
export type TUser = {
  id?: string;
  name: string;
  email: string;
  role?: "user" | "admin";
  phone?: string;
};

// Token
export type TUserToken = string | null;

// User Response
export type TUserResponse = {
  message: string;
  token: TUserToken;
  user: TUser;
};

// User Address
export type TUserAddress = {
  details?: string;
  phone?: string;
  city?: string;
};
