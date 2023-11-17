import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type QueryParams = {
  searchTerm: string;
  pageNumber: number;
  itemsPerPage: number;
};

export const doomerApi = createApi({
  reducerPath: 'doomerApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com' }),
  endpoints: (build) => ({
    getProducts: build.query({
      query: ({ searchTerm, pageNumber, itemsPerPage }: QueryParams) => ({
        url: '/products/search',
        params: {
          q: searchTerm,
          limit: itemsPerPage,
          skip: pageNumber - 1,
        },
      }),
    }),
  }),
});

export const { useGetProductsQuery } = doomerApi;
