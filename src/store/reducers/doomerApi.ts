import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type QueryParams = {
  searchTerm: string;
  pageNumber: number;
  perPage: number;
};

export const doomerApi = createApi({
  reducerPath: 'doomerApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com' }),
  endpoints: (build) => ({
    getProducts: build.query({
      query: ({ searchTerm, pageNumber, perPage }: QueryParams) => ({
        url: '/products/search',
        params: {
          q: searchTerm,
          limit: perPage,
          skip: pageNumber - 1,
        },
      }),
    }),
  }),
});

export const { useGetProductsQuery } = doomerApi;
