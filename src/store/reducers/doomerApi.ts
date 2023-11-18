import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProductsData } from '../../types/types';

type QueryParams = {
  searchTerm: string;
  pageNumber: number;
  itemsPerPage: number;
};

export const doomerApi = createApi({
  reducerPath: 'doomerApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com' }),
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
  }),
});

export const { useGetProductsQuery } = doomerApi;
