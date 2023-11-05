import React, { useCallback, useEffect, useState } from 'react';
import { BeerData } from '../../types';
import { API, SEARCH_TERM_STORAGE_KEY } from '../../constants/constants';
import { BeerAPI } from '../../API/BeerAPI';
import SearchSection from '../../components/SearchSection/SearchSection';
import Loader from '../../components/Loader/Loader';
import InfoSection from '../../components/InfoSection/InfoSection';
import classes from './MainPage.module.css';
import Pagination from '../../components/UI/Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';

function MainPage() {
  const [beers, setBeers] = useState<BeerData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(API.initialPageNumber);
  const [itemsPerPage] = useState(API.itemsPerPage);
  const [search] = useSearchParams();

  const getBeers = useCallback(
    async (value: string, currentPage: number, itemsPerPage: number) => {
      console.log(currentPage);
      localStorage.setItem(SEARCH_TERM_STORAGE_KEY, value);
      setIsLoading(true);
      try {
        const response = await BeerAPI.getBeers(
          value,
          currentPage,
          itemsPerPage
        );
        setBeers(response);
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
    const pageNumber = Number(search.get('page'));
    setCurrentPage(pageNumber);
    setSearchTerm(localStorage.getItem(SEARCH_TERM_STORAGE_KEY) || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    console.log();
    getBeers(searchTerm, currentPage, itemsPerPage);
  }, [searchTerm, getBeers, currentPage, itemsPerPage]);

  return (
    <div className={classes.wrapper}>
      <SearchSection searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {isLoading ? (
        <Loader />
      ) : (
        <main className="main">
          <InfoSection beers={beers} />
          <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} />
        </main>
      )}
    </div>
  );
}

export default MainPage;
