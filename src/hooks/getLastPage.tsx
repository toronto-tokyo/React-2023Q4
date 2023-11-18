import { API } from '../constants/constants';
import { useGetProductsQuery } from '../store/reducers/doomerApi';
import { useGetCurrentPage } from './getCurrentPage';
import { useAppSelector } from './redux';

export const useGetLastPage = () => {
  const { itemsPerPage, searchTerm } = useAppSelector(
    (store) => store.appState
  );
  const pageNumber = useGetCurrentPage();
  const { data } = useGetProductsQuery({
    itemsPerPage,
    searchTerm,
    pageNumber,
  });
  if (data) {
    return Math.ceil(data.total / itemsPerPage);
  }
  return API.initialPageNumber;
};
