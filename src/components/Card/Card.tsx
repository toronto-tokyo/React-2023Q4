import { ProductData } from '../../types/types';
import classes from './Card.module.css';
import { useNavigate } from 'react-router-dom';

interface Props {
  itemData: ProductData;
}

function Card({ itemData }: Props) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/${itemData.id + window.location.search}`);
  };
  return (
    <div
      className={classes.card}
      onClick={handleClick}
      data-testid="cardElement"
    >
      <img src={itemData.images[0]} alt="avatar" className={classes.img} />
      <div className={classes.info}>
        <p className={classes.name}>{itemData.title}</p>
        <p>Brand: {itemData.brand}</p>
        <p>Price: {itemData.price}</p>
      </div>
    </div>
  );
}

export default Card;
