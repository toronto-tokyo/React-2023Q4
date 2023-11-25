import PrevBtn from './prevBtn';
import NextBtn from './nextBtn';
import StartBtn from './startBtn';
import EndBtn from './endBtn';
import classes from './Pagination.module.css';

interface IProps {
  pageNumber: number;
  lastPageNumber: number;
}

function Pagination({ pageNumber, lastPageNumber }: IProps) {
  return (
    <div className={classes.pagination}>
      <StartBtn currentPage={pageNumber} className={classes.button}></StartBtn>
      <PrevBtn currentPage={pageNumber} className={classes.button}></PrevBtn>
      <div className={classes.currentPageDisplay}>
        <span>{pageNumber}</span>
        <span>/</span>
        <span>{lastPageNumber}</span>
      </div>
      <NextBtn
        currentPage={pageNumber}
        lastPage={lastPageNumber}
        className={classes.button}
      ></NextBtn>
      <EndBtn
        currentPage={pageNumber}
        lastPage={lastPageNumber}
        className={classes.button}
      ></EndBtn>
    </div>
  );
}

export default Pagination;
