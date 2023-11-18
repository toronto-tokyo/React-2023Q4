import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { API, SEARCH_TERM_STORAGE_KEY } from '../../constants/constants';
import { DummyAPI } from '../../API/DummyAPI';
import SearchSection from '../../components/SearchSection/SearchSection';
import InfoSection from '../../components/InfoSection/InfoSection';
import classes from './MainPage.module.css';
import Pagination from '../../components/UI/Pagination/Pagination';
import { Outlet, useSearchParams } from 'react-router-dom';
import ItemsCount from '../../components/UI/ItemsCount/ItemsCount';
import { stateReducer } from '../../stateReducer/stateReducer';
import {
  StateContext,
  StateDispatchContext,
} from '../../stateContext/StateContext';

const stateInitialValue = {
  data: null,
  isLoading: false,
  searchTerm: '',
  itemsPerPage: API.itemsPerPage,
};

function MainPage() {
  // const { isMainPageLoading } = useAppSelector((store) => store.appState);
  const [search] = useSearchParams();
  const [state, dispatch] = useReducer(stateReducer, stateInitialValue);
  const [currentPageNumber, setCurrentPageNumber] = useState(
    API.initialPageNumber
  );

  const getProducts = useCallback(
    (value: string, currentPage: number, itemsPerPage: number) => {
      (async () => {
        dispatch({
          type: 'fetch-request',
        });
        try {
          const response = await DummyAPI.getProducts(
            value,
            currentPage,
            itemsPerPage
          );
          dispatch({
            type: 'fetch-success',
            payload: response,
          });
        } catch (error) {
          console.error(error);
        }
      })();
    },
    []
  );

  useEffect(() => {
    dispatch({
      type: 'change-search-term',
      searchTerm: localStorage.getItem(SEARCH_TERM_STORAGE_KEY) || '',
    });
  }, []);

  useEffect(() => {
    localStorage.setItem(SEARCH_TERM_STORAGE_KEY, state.searchTerm);
    getProducts(state.searchTerm, currentPageNumber, state.itemsPerPage);
  }, [state.searchTerm, getProducts, state.itemsPerPage, currentPageNumber]);

  useEffect(() => {
    const pageNumber = Number(search.get('page'));
    if (pageNumber === currentPageNumber) return;
    if (pageNumber < API.initialPageNumber) {
      setCurrentPageNumber(API.initialPageNumber);
      return;
    }
    setCurrentPageNumber(pageNumber);
  }, [search, currentPageNumber]);

  return (
    <StateContext.Provider value={state}>
      <StateDispatchContext.Provider value={dispatch}>
        <div className={classes.wrapper}>
          <SearchSection />
          <main className={classes.main}>
            <div>
              <ItemsCount />
              <InfoSection />
              <Pagination />
            </div>
            <Outlet></Outlet>
          </main>
        </div>
      </StateDispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default MainPage;
