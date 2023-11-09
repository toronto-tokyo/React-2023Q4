import React, { useContext, useEffect, useState } from 'react';
import { getLastPage } from '../../../utils/getLastPage';
import PrevBtn from './PrevBtn/PrevBtn';
import NextBtn from './NextBtn/NextBtn';
import StartBtn from './StartBtn/StartBtn';
import EndBtn from './EndBtn/EndBtn';
import classes from './Pagination.module.css';
import { StateContext } from '../../../stateContext/StateContext';
import { API } from '../../../constants/constants';
import { useSearchParams } from 'react-router-dom';

function Pagination() {
  const state = useContext(StateContext);
  const [currentPage, setCurrentPage] = useState<number>(API.initialPageNumber);
  const [lastPage, setLastPage] = useState<number>(0);
  const [searchQuery] = useSearchParams();

  useEffect(() => {
    setCurrentPage(Number(searchQuery.get('page')) || API.initialPageNumber);
    setLastPage(getLastPage(state?.itemsPerPage, state?.data?.total));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.pagination}>
      <StartBtn currentPage={currentPage} className={classes.button}></StartBtn>
      <PrevBtn currentPage={currentPage} className={classes.button}></PrevBtn>
      <div className={classes.currentPageDisplay}>
        <span>{currentPage}</span>
        <span>/</span>
        <span>{lastPage}</span>
      </div>
      <NextBtn
        currentPage={currentPage}
        lastPage={lastPage}
        className={classes.button}
      ></NextBtn>
      <EndBtn
        currentPage={currentPage}
        lastPage={lastPage}
        className={classes.button}
      ></EndBtn>
    </div>
  );
}

export default Pagination;
