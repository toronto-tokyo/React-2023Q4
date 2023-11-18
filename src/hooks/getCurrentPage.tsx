import { useNavigate, useSearchParams } from 'react-router-dom';
import { API } from '../constants/constants';

export const useGetCurrentPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const pageNumber = Number(searchParams.get('page'));
  if (pageNumber < API.initialPageNumber) {
    navigate(`?page=${API.initialPageNumber}`);
    return API.initialPageNumber;
  }
  return pageNumber;
};
