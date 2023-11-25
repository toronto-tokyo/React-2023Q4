import { API } from '@/constants/constants';
import { useRouter } from 'next/router';
import React from 'react';

interface IProps {
  currentPage: number;
  className: string;
}

function PrevBtn({ currentPage, className }: IProps) {
  const router = useRouter();
  const handleClick = () => {
    const routerQuery = router.query;
    const { q, per_page } = routerQuery;
    const queryParams: Record<string, string | string[]> = {
      page: String(currentPage - 1),
    };
    if (q) {
      queryParams.q = q;
    }
    if (per_page) {
      queryParams.per_page = per_page;
    }
    router.push({ query: queryParams });
  };
  return currentPage === API.initialPageNumber ? (
    <button className={className} disabled onClick={handleClick}>
      Prev
    </button>
  ) : (
    <button className={className} onClick={handleClick}>
      Prev
    </button>
  );
}

export default PrevBtn;
