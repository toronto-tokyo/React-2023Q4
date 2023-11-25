import { API } from '@/constants/constants';
import { api } from '@/redux/api';
import { wrapper } from '@/redux/store';
import React from 'react';
import classes from '../styles/indexPage.module.css';
import CardList from '@/components/cardList/cardList';
import { InferGetServerSidePropsType } from 'next';
import { ProductsData } from '@/types/type';
import Header from '@/components/header/header';
import ItemsPerPage from '@/components/UI/itemsPerPage/itemsPerPage';
import Pagination from '@/components/UI/pagination/pagination';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query }) => {
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
      const apiState = await Promise.all(
        store.dispatch(api.util.getRunningQueriesThunk())
      );
      const allProductsData = apiState.find(
        (item) => item.endpointName === 'getProducts'
      )?.data as ProductsData | undefined;
      const lastPageNumber = Math.ceil(
        (allProductsData?.total || 1) / itemsPerPage
      );
      return {
        props: {
          searchTerm,
          pageNumber,
          itemsPerPage,
          allProductsData,
          lastPageNumber,
        },
      };
    }
);

function Index({
  searchTerm,
  pageNumber,
  itemsPerPage,
  allProductsData,
  lastPageNumber,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className={classes.wrapper}>
      <Header searchTerm={searchTerm} />
      <main className={classes.main}>
        <div className={classes.mainLeftSide}>
          <ItemsPerPage itemsPerPage={itemsPerPage} />
          <CardList data={allProductsData} />
          <Pagination pageNumber={pageNumber} lastPageNumber={lastPageNumber} />
        </div>
      </main>
    </div>
  );
}

export default Index;
