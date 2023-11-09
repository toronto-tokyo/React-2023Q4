import { useContext } from 'react';
import Card from '../Card/Card';
import classes from './InfoSection.module.css';
import { StateContext } from '../../stateContext/StateContext';

function InfoSection() {
  const state = useContext(StateContext);

  return (
    <section className={classes.infoSection}>
      {!!state?.data ? (
        <div className={classes.cards}>
          {state.data.products.map((product) => (
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
