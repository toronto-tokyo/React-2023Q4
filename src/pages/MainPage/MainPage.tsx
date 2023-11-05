import React, { useCallback, useEffect, useState } from 'react';
import { ProductsData } from '../../types';
import { API, SEARCH_TERM_STORAGE_KEY } from '../../constants/constants';
import { DummyAPI } from '../../API/DummyAPI';
import SearchSection from '../../components/SearchSection/SearchSection';
import Loader from '../../components/Loader/Loader';
import InfoSection from '../../components/InfoSection/InfoSection';
import classes from './MainPage.module.css';
import Pagination from '../../components/UI/Pagination/Pagination';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import ItemsCount from '../../components/UI/ItemsCount/ItemsCount';

function MainPage() {
  const [products, setProducts] = useState<ProductsData | ''>('');
  const [searchTerm, setSearchTerm] = useState(
    () => localStorage.getItem(SEARCH_TERM_STORAGE_KEY) || ''
  );
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(API.initialPageNumber);
  const [itemsPerPage, setItemsPerPage] = useState(API.itemsPerPage);
  const [search] = useSearchParams();
  const navigate = useNavigate();

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
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    []
  );

  useEffect(() => {
    const searchTerm = localStorage.getItem(SEARCH_TERM_STORAGE_KEY) || '';
    setSearchTerm(searchTerm);
  }, []);

  useEffect(() => {
    let pageNumber = Number(search.get('page'));
    if (pageNumber < API.initialPageNumber) {
      pageNumber = API.initialPageNumber;
      navigate(`?page=${API.initialPageNumber}`);
    }
    setCurrentPage(pageNumber);
    getProducts(searchTerm, pageNumber, itemsPerPage);
  }, [searchTerm, getProducts, currentPage, itemsPerPage, search, navigate]);

  return (
    <div className={classes.wrapper}>
      <SearchSection
        setCurrentPage={setCurrentPage}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <main className={classes.main}>
          <div>
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
          </div>
          <Outlet></Outlet>
        </main>
      )}
    </div>
  );
}

export default MainPage;
