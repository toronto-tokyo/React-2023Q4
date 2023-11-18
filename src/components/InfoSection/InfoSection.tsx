import Card from '../Card/Card';
import classes from './InfoSection.module.css';
import { useGetProductsQuery } from '../../store/reducers/doomerApi';
import { ProductData } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useGetCurrentPage } from '../../hooks/getCurrentPage';
import { setIsMainPageLoading } from '../../store/reducers/appSlice';
import Loader from '../Loader/Loader';

function InfoSection() {
  const { searchTerm, itemsPerPage } = useAppSelector(
    (store) => store.appState
  );
  const dispatch = useAppDispatch();
  const pageNumber = useGetCurrentPage();
  const { data, isLoading } = useGetProductsQuery({
    searchTerm,
    pageNumber,
    itemsPerPage,
  });
  dispatch(setIsMainPageLoading(isLoading));

  return (
    <section className={classes.infoSection}>
      {isLoading && <Loader />}
      {!data && <h1 className={classes.notFound}>Not not found</h1>}
      {!isLoading && data && (
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
