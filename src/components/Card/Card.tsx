import { BeerData } from '../../types';
import classes from './Card.module.css';

interface Props {
  itemData: BeerData;
}

function Card({ itemData }: Props) {
  return (
    <div className={classes.card}>
      <img src={itemData.image_url} alt="avatar" className={classes.img} />
      <div className={classes.info}>
        <p className={classes.name}>{itemData.name}</p>
        <p>Tagline: {itemData.tagline}</p>
        <p>Volume: {itemData.volume.value}</p>
      </div>
    </div>
  );
}

export default Card;
