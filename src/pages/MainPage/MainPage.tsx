import { useEffect } from 'react';
import { API } from '../../constants/constants';
import SearchSection from '../../components/SearchSection/SearchSection';
import InfoSection from '../../components/InfoSection/InfoSection';
import classes from './MainPage.module.css';
import Pagination from '../../components/UI/Pagination/Pagination';
import { Outlet, useNavigate } from 'react-router-dom';
import ItemsCount from '../../components/UI/ItemsCount/ItemsCount';
import { useGetCurrentPage } from '../../hooks/getCurrentPage';

function MainPage() {
  const navigate = useNavigate();
  const currentPage = useGetCurrentPage();

  useEffect(() => {
    if (currentPage < API.initialPageNumber) {
      navigate(`?page=${API.initialPageNumber}`);
    }
  }, [currentPage, navigate]);

  return (
    <div className={classes.wrapper}>
      <SearchSection />
      <main className={classes.main}>
        <div className={classes.mainLeftSide}>
          <ItemsCount />
          <InfoSection />
          <Pagination />
        </div>
        <Outlet></Outlet>
      </main>
    </div>
  );
}

export default MainPage;
