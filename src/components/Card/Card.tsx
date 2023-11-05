import { ProductData } from '../../types';
import classes from './Card.module.css';
import { Link } from 'react-router-dom';

interface Props {
  itemData: ProductData;
}

function Card({ itemData }: Props) {
  return (
    <Link
      to={`/${itemData.id + window.location.search}`}
      className={classes.card}
    >
      <img src={itemData.images[0]} alt="avatar" className={classes.img} />
      <div className={classes.info}>
        <p className={classes.name}>{itemData.title}</p>
        <p>Brand: {itemData.brand}</p>
        <p>Price: {itemData.price}</p>
      </div>
    </Link>
  );
}

export default Card;
