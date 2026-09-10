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
};

// User
export type TUser = {
  name: string;
  email: string;
  role: "user" | "admin";
};

// Token
export type TUserToken = string | null;

// User Response
export type TUserResponse = {
  message: string;
  token: TUserToken;
  user: TUser;
};
