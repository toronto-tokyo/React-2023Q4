import ItemsPerPage from '../UI/itemsPerPage/itemsPerPage';
import Pagination from '../UI/pagination/pagination';
import CardList from '../cardList/cardList';
import Header from '../header/header';
import classes from '../../styles/indexPage.module.css';
import { ProductsData } from '@/types/type';

interface IProps {
  children?: JSX.Element;
  searchTerm: string;
  pageNumber: number;
  itemsPerPage: number;
  allProductsData: ProductsData | undefined;
  lastPageNumber: number;
}

export default function Layout({
  children,
  searchTerm,
  pageNumber,
  itemsPerPage,
  allProductsData,
  lastPageNumber,
}: IProps) {
  return (
    <div className={classes.wrapper}>
      <Header searchTerm={searchTerm} />
      <main className={classes.main}>
        <div className={classes.mainLeftSide}>
          <ItemsPerPage itemsPerPage={itemsPerPage} />
          <CardList data={allProductsData} />
          <Pagination pageNumber={pageNumber} lastPageNumber={lastPageNumber} />
        </div>
        {children}
      </main>
    </div>
  );
}
