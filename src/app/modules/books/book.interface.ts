export type IBookFilterRequest = {
  search?: string;
  title?: string;
  author?: string;
  genre?: string;
  category?: string;
  maxPrice?: number;
  minPrice?: number;
};
