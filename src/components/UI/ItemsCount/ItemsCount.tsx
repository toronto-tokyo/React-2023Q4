import classes from './itemsCount.module.css';
import { API, ITEMS_PER_PAGE_OPTIONS } from '../../../constants/constants';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux';
import { changeItemsPerPage } from '../../../store/reducers/appSlice';

function ItemsCount() {
  const navigate = useNavigate();
  const { itemsPerPage } = useAppSelector((store) => store.appState);
  const dispatch = useAppDispatch();

  const changeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedItemsPerPage = Number(e.target.value) || itemsPerPage;
    navigate(`?page=${API.initialPageNumber}`);
    dispatch(changeItemsPerPage(selectedItemsPerPage));
  };

  return (
    <div className={classes.itemsCount}>
      <select
        className={classes.select}
        value={itemsPerPage}
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
