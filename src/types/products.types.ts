export type TProducts = {
  id: number;
  title: string;
  slug?: string;
  description?: string;
  imageCover: string;
  images: string[];
  price: number;
  priceAfterDiscount?: number;
  quantity?: number;
  isFavorite?: boolean;
  isAuthenticated?: boolean;
};

export type TProductsResponse = {
  data: TProducts[];
};

export type TCartProduct = {
  count: number;
  price: number;
  product: {
    id: string;
    title: string;
    slug: string;
    priceAfterDiscount?: number;
    quantity: number;
    imageCover: string;
    images: string[];
  };
};

export type TCartItem = {
  totalCartPrice: number;
  products: TCartProduct[];
};

export type TCartItemResponse = {
  cartId: string;
  data: TCartItem;
};
