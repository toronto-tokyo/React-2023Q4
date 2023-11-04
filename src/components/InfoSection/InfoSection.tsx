import { Card } from '../Card';
import { BeerData } from '../../types';
import classes from './InfoSection.module.css';

interface Props {
  beers: BeerData[];
}

function InfoSection({ beers }: Props) {
  return (
    <section className={classes.infoSection}>
      {beers.length ? (
        <div className={classes.cards}>
          {beers?.map((item) => <Card key={item.id} itemData={item} />)}
        </div>
      ) : (
        <h1 className={classes.notFound}>Not not found</h1>
      )}
    </section>
  );
}

export default InfoSection;
