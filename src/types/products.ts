export type TProducts = {
  id: number;
  title: string;
  slug?: string;
  description: string;
  imageCover: string;
  price: number;
  priceAfterDiscount?: number;
  quantity?: number;
  amount?: number;
  isFavorite?: boolean;
};

export type TProductsResponse = {
  data: TProducts[];
};
