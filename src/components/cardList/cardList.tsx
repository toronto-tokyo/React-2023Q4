import { ProductData, ProductsData } from '@/types/type';
import React from 'react';
import classes from './cardList.module.css';
import Card from '../UI/card/card';

interface IProps {
  data: ProductsData | undefined;
}

function CardList({ data }: IProps) {
  return (
    <section className={classes.infoSection}>
      {!data && <h1 className={classes.notFound}>Not not found</h1>}
      {data && (
        <div className={classes.cards}>
          {data.products.map((product: ProductData) => (
            <Card key={product.id} itemData={product} />
          ))}
        </div>
      )}
    </section>
  );
}

export default CardList;
