import type { TUser, TUserAddress } from "./auth.types";
import type { TCartProduct } from "./products.types";

export type TOrderData = {
  id: string;
  user: TUser;
  shippingAddress: TUserAddress;
  cartItems: TCartProduct[];
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  shippingPrice: number;
  taxPrice: number;
  totalOrderPrice: number;
  createdAt: string;
  updatedAt: string;
};
