import { useSearchParams } from 'react-router-dom';

export const useGetCurrentPage = () => {
  const [searchParams] = useSearchParams();
  const pageNumber = Number(searchParams.get('page'));
  return pageNumber;
};
