import React, { useEffect, useState } from 'react';
import { getLastPage } from '../../../utils/getLastPage';
import PrevBtn from './PrevBtn/PrevBtn';
import NextBtn from './NextBtn/NextBtn';
import StartBtn from './StartBtn/StartBtn';
import EndBtn from './EndBtn/EndBtn';
import classes from './Pagination.module.css';

interface Props {
  currentPage: number;
  itemsPerPage: number;
}

function Pagination({ currentPage, itemsPerPage }: Props) {
  const [lastPage, setLastPage] = useState<number>(0);

  useEffect(() => {
    setLastPage(getLastPage(itemsPerPage));
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
