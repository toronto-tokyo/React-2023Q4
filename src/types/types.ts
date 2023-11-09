export interface ProductsData {
  products: ProductData[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductData {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface State {
  data: null | ProductsData;
  searchTerm: string;
  itemsPerPage: number;
  isLoading: boolean;
}

export type Action =
  | { type: 'change-search-term'; searchTerm: string }
  | { type: 'change-items-per-page'; itemsPerPage: number }
  | { type: 'fetch-request' }
  | { type: 'fetch-success'; payload: null | ProductsData };
