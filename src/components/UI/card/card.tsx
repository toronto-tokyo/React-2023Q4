import { ProductData } from '@/types/type';
import classes from './Card.module.css';
import Image from 'next/image';

interface Props {
  itemData: ProductData;
}

function Card({ itemData }: Props) {
  return (
    <div className={classes.card} data-testid="cardElement">
      <Image src={itemData.images[0]} alt="avatar" width={100} height={100} />
      <div className={classes.info}>
        <p className={classes.name}>{itemData.title}</p>
        <p>Brand: {itemData.brand}</p>
        <p>Price: {itemData.price}</p>
      </div>
    </div>
  );
}

export default Card;
