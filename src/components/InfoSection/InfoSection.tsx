import Card from '../Card/Card';
import classes from './InfoSection.module.css';
import { useGetProductsQuery } from '../../store/reducers/doomerApi';
import { ProductData } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useGetCurrentPage } from '../../hooks/getCurrentPage';
import { setIsMainPageLoading } from '../../store/reducers/appSlice';
import Loader from '../Loader/Loader';
import { useEffect } from 'react';

function InfoSection() {
  const { searchTerm, itemsPerPage } = useAppSelector(
    (store) => store.appState
  );
  const dispatch = useAppDispatch();
  const pageNumber = useGetCurrentPage();
  const { data, isFetching } = useGetProductsQuery({
    searchTerm,
    pageNumber,
    itemsPerPage,
  });

  useEffect(() => {
    dispatch(setIsMainPageLoading(isFetching));
  }, [isFetching, dispatch]);

  return (
    <section className={classes.infoSection}>
      {isFetching && <Loader />}
      {!data && <h1 className={classes.notFound}>Not not found</h1>}
      {!isFetching && data && (
        <>
          <div className={classes.cards}>
            {data.products.map((product: ProductData) => (
              <Card key={product.id} itemData={product} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default InfoSection;
