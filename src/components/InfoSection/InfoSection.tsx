import Card from '../Card/Card';
import classes from './InfoSection.module.css';
import { useGetProductsQuery } from '../../store/reducers/doomerApi';
import { ProductData } from '../../types/types';
import { useAppSelector } from '../../hooks/redux';

function InfoSection() {
  const { searchTerm, itemsPerPage } = useAppSelector(
    (store) => store.appState
  );
  const { data } = useGetProductsQuery({
    searchTerm,
    pageNumber: 1,
    itemsPerPage,
  });

  return (
    <section className={classes.infoSection}>
      {data ? (
        <div className={classes.cards}>
          {data.products.map((product: ProductData) => (
            <Card key={product.id} itemData={product} />
          ))}
        </div>
      ) : (
        <h1 className={classes.notFound}>Not not found</h1>
      )}
    </section>
  );
}

export default InfoSection;
