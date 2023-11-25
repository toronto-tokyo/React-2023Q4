import { ProductData, ProductsData } from '@/types/type';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

type QueryParams = {
  searchTerm: string;
  pageNumber: number;
  itemsPerPage: number;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com' }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (build) => ({
    getProducts: build.query<ProductsData, QueryParams>({
      query: ({ searchTerm, pageNumber, itemsPerPage }) => ({
        url: '/products/search',
        params: {
          q: searchTerm,
          limit: itemsPerPage,
          skip: (pageNumber - 1) * itemsPerPage,
        },
      }),
    }),
    getDetailedProduct: build.query<ProductData, number>({
      query: (id) => ({
        url: `/products/${id}`,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetDetailedProductQuery,
  util: { getRunningQueriesThunk },
} = api;
