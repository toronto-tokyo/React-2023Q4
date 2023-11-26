import { ProductData } from '@/types/type';
import classes from './Card.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface Props {
  itemData: ProductData;
}

function Card({ itemData }: Props) {
  const router = useRouter();

  const handleClick = () => {
    const routerQuery = router.query;
    const { q, per_page, page } = routerQuery;
    const queryParams: Record<string, string | string[]> = {};
    if (q) {
      queryParams.q = q;
    }
    if (per_page) {
      queryParams.per_page = per_page;
    }
    if (page) {
      queryParams.page = page;
    }
    router.push({ pathname: `/${itemData.id}`, query: queryParams });
  };

  return (
    <div
      className={classes.card}
      data-testid="cardElement"
      onClick={handleClick}
    >
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
