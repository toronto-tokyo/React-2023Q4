import { useRouter } from 'next/router';
import classes from './detailedCard.module.css';
import { ProductData } from '@/types/type';
import Image from 'next/image';

interface IProps {
  data: ProductData | undefined;
}

function DetailsCard({ data }: IProps) {
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
    router.push({ pathname: '/', query: queryParams });
  };

  return (
    <>
      {data && (
        <div className={classes.productWrapper} data-testid="detailedCard">
          <div className={classes.middleware} onClick={handleClick}></div>
          <div className={classes.product}>
            <button className={classes.closeButton} onClick={handleClick}>
              Close
            </button>
            <Image src={data.images[0]} alt="img" width={400} height={400} />
            <div className={classes.title}>{data.title}</div>
            <div className={classes.productDescription}>
              <div>
                <span>Brand:</span>
                {data.brand}
              </div>
              <div>
                <span>Price:</span>
                {data.price}
              </div>
              <div>
                <span>Description:</span>
                {data.description}
              </div>
              <div>
                <span>Rating:</span>
                {data.rating}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DetailsCard;
