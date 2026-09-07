export type TCategory = {
  id?: number;
  name: string;
  slug?: string;
  image: string;
};

export type TCategoryResponse = {
  data: TCategory[];
};
