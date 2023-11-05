import React from 'react';
import classes from './itemsCount.module.css';
import { API, ITEMS_PER_PAGE_OPTIONS } from '../../../constants/constants';
import { useNavigate } from 'react-router-dom';

interface Props {
  itemsPerPage: number;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
}

function ItemsCount({ itemsPerPage, setItemsPerPage }: Props) {
  const navigate = useNavigate();

  const changeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    navigate(`?page=${API.initialPageNumber}`);
  };
  return (
    <div className={classes.itemsCount}>
      <select
        className={classes.select}
        value={itemsPerPage}
        onChange={changeHandler}
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
