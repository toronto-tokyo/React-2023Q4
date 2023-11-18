import PrevBtn from './PrevBtn/PrevBtn';
import NextBtn from './NextBtn/NextBtn';
import StartBtn from './StartBtn/StartBtn';
import EndBtn from './EndBtn/EndBtn';
import classes from './Pagination.module.css';
import { useGetCurrentPage } from '../../../hooks/getCurrentPage';
import { useGetLastPage } from '../../../hooks/getLastPage';

function Pagination() {
  const currentPage = useGetCurrentPage();
  const lastPage = useGetLastPage();

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
