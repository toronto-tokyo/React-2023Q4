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
      return {
        props: { searchTerm, pageNumber, itemsPerPage, allProductsData },
      };
    }
);

function Index({
  searchTerm,
  pageNumber,
  itemsPerPage,
  allProductsData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className={classes.wrapper}>
      <Header searchTerm={searchTerm} />
      <main className={classes.main}>
        <div className={classes.mainLeftSide}>
          <ItemsPerPage itemsPerPage={itemsPerPage} />
          <CardList data={allProductsData} />
        </div>
      </main>
    </div>
  );
}

export default Index;
