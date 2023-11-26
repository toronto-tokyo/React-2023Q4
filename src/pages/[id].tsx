import DetailsCard from '@/components/detailedCard/detailedCard';
import Layout from '@/components/layout/layout';
import { API } from '@/constants/constants';
import { api } from '@/redux/api';
import { wrapper } from '@/redux/store';
import { ProductData, ProductsData } from '@/types/type';
import { InferGetServerSidePropsType } from 'next';
import React from 'react';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ resolvedUrl, query }) => {
      const id = Number(resolvedUrl.split('?')[0].split('/').at(-1));
      let { q, page, per_page } = query;
      const searchTerm = String(q || '');
      const pageNumber = Number(page || API.initialPageNumber);
      const itemsPerPage = Number(per_page || API.itemsPerPage);
      store.dispatch(
        api.endpoints.getProducts.initiate({
          searchTerm,
          pageNumber,
          itemsPerPage,
        })
      );
      store.dispatch(api.endpoints.getDetailedProduct.initiate(id));
      const apiState = await Promise.all(
        store.dispatch(api.util.getRunningQueriesThunk())
      );
      const allProductsData = apiState.find(
        (item) => item.endpointName === 'getProducts'
      )?.data as ProductsData | undefined;
      const detailedProductData = apiState.find(
        (item) => item.endpointName === 'getDetailedProduct'
      )?.data as ProductData | undefined;
      const lastPageNumber = Math.ceil(
        (allProductsData?.total || 1) / itemsPerPage
      );
      return {
        props: {
          searchTerm,
          pageNumber,
          itemsPerPage,
          allProductsData,
          detailedProductData,
          lastPageNumber,
        },
      };
    }
);

function detailedPage({
  searchTerm,
  pageNumber,
  itemsPerPage,
  allProductsData,
  detailedProductData,
  lastPageNumber,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout
      allProductsData={allProductsData}
      itemsPerPage={itemsPerPage}
      lastPageNumber={lastPageNumber}
      pageNumber={pageNumber}
      searchTerm={searchTerm}
    >
      <DetailsCard data={detailedProductData} />
    </Layout>
  );
}

export default detailedPage;
