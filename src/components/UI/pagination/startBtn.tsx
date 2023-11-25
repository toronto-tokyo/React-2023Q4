import { API } from '@/constants/constants';
import { useRouter } from 'next/router';
import React from 'react';

interface IProps {
  currentPage: number;
  className: string;
}

function StartBtn({ currentPage, className }: IProps) {
  const router = useRouter();
  const handleClick = () => {
    const routerQuery = router.query;
    const { q, per_page } = routerQuery;
    const queryParams: Record<string, string | string[]> = {
      page: String(API.initialPageNumber),
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
      Start
    </button>
  ) : (
    <button className={className} onClick={handleClick}>
      Start
    </button>
  );
}

export default StartBtn;
