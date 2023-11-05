import React from 'react';
import classes from './itemsCount.module.css';
import { ITEMS_PER_PAGE_OPTIONS } from '../../../constants/constants';

interface Props {
  itemsPerPage: number;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
}

function ItemsCount({ itemsPerPage, setItemsPerPage }: Props) {
  return (
    <div className={classes.itemsCount}>
      <select
        className={classes.select}
        value={itemsPerPage}
        onChange={(e) => setItemsPerPage(Number(e.target.value))}
      >
        {ITEMS_PER_PAGE_OPTIONS.map((item) => (
          <option key={item.value} value={item.value}>
            {item.name}
          </option>
        ))}
      </select>
      <div>Items / page</div>
    </div>
  );
}

export default ItemsCount;
