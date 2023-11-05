import { API } from '../constants/constants';

export function getLastPage(
  itemsPerPage = API.itemsPerPage,
  items = API.allItemsCount
) {
  return Math.ceil(items / itemsPerPage);
}
