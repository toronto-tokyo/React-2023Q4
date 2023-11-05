import React, { useCallback, useEffect, useState } from 'react';
import { ProductsData } from '../../types';
import { API, SEARCH_TERM_STORAGE_KEY } from '../../constants/constants';
import { DummyAPI } from '../../API/DummyAPI';
import SearchSection from '../../components/SearchSection/SearchSection';
import Loader from '../../components/Loader/Loader';
import InfoSection from '../../components/InfoSection/InfoSection';
import classes from './MainPage.module.css';
import Pagination from '../../components/UI/Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';
import ItemsCount from '../../components/UI/ItemsCount/ItemsCount';

function MainPage() {
  const [products, setProducts] = useState<ProductsData | ''>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(API.initialPageNumber);
  const [itemsPerPage, setItemsPerPage] = useState(API.itemsPerPage);
  const [search, setSearch] = useSearchParams();

  const getProducts = useCallback(
    async (value: string, currentPage: number, itemsPerPage: number) => {
      localStorage.setItem(SEARCH_TERM_STORAGE_KEY, value);
      setIsLoading(true);
      try {
        const response = await DummyAPI.getProducts(
          value,
          currentPage,
          itemsPerPage
        );
        setProducts(response);
        await delay();
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    []
  );

  const delay = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
  };

  useEffect(() => {
    setCurrentPage(API.initialPageNumber);
  }, [itemsPerPage]);

  useEffect(() => {
    const pageNumber = Number(search.get('page'));
    setCurrentPage(pageNumber);
    setSearchTerm(localStorage.getItem(SEARCH_TERM_STORAGE_KEY) || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    console.log();
    setSearch({ page: `${currentPage}` });
    getProducts(searchTerm, currentPage, itemsPerPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, getProducts, currentPage, itemsPerPage]);

  return (
    <div className={classes.wrapper}>
      <SearchSection searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {isLoading ? (
        <Loader />
      ) : (
        <main className="main">
          <ItemsCount
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
          />
          <InfoSection products={products} />
          <Pagination
            totalItemsCount={products}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
          />
        </main>
      )}
    </div>
  );
}

export default MainPage;
