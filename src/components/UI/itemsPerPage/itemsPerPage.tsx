import classes from './itemsPerPage.module.css';
import { API, ITEMS_PER_PAGE_OPTIONS } from '../../../constants/constants';
import { useRouter } from 'next/router';

interface IProps {
  itemsPerPage: number;
}

function ItemsPerPage({ itemsPerPage }: IProps) {
  const router = useRouter();

  const changeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedItemsPerPage = Number(e.target.value) || itemsPerPage;
    const routerQuery = router.query;
    const { q } = routerQuery;
    const queryParams: Record<string, string | string[]> = {
      page: String(API.initialPageNumber),
      per_page: String(selectedItemsPerPage),
    };
    if (q) {
      queryParams.q = q;
    }
    router.push({
      query: queryParams,
    });
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

export default ItemsPerPage;
