import type { TUser, TUserAddress } from "./auth.types";
import type { TCartProduct } from "./products.types";

type TOrdersPricing = {
  cartPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalOrderPrice: number;
};

type TOrdersData = {
  id: string;
  user: TUser;
  shippingAddress: TUserAddress;
  cartItems: TCartProduct[];
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TOrdersList = {
  data: TOrdersData;
  pricing: TOrdersPricing;
};
