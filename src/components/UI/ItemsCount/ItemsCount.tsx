import React, { useContext } from 'react';
import classes from './itemsCount.module.css';
import { API, ITEMS_PER_PAGE_OPTIONS } from '../../../constants/constants';
import { useNavigate } from 'react-router-dom';
import {
  StateContext,
  StateDispatchContext,
} from '../../../stateContext/StateContext';

function ItemsCount() {
  const navigate = useNavigate();
  const state = useContext(StateContext);
  const dispatchState = useContext(StateDispatchContext);

  const changeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatchState &&
      dispatchState({
        type: 'change-items-per-page',
        itemsPerPage: Number(e.target.value),
      });
    navigate(`?page=${API.initialPageNumber}`);
  };
  return (
    <div className={classes.itemsCount}>
      <select
        className={classes.select}
        value={state?.itemsPerPage}
        onChange={changeHandler}
        data-testid="selectComponent"
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
