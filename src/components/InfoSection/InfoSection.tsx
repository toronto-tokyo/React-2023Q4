import { ProductsData } from '../../types';
import Card from '../Card/Card';
import classes from './InfoSection.module.css';

interface Props {
  products: ProductsData | '';
}

function InfoSection({ products }: Props) {
  return (
    <section className={classes.infoSection}>
      {typeof products === 'object' ? (
        <div className={classes.cards}>
          {products.products.map((product) => (
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
