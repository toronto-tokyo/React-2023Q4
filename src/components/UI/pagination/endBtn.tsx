import { useRouter } from 'next/router';
import React from 'react';

interface IProps {
  lastPage: number;
  currentPage: number;
  className: string;
}

function EndBtn({ lastPage, currentPage, className }: IProps) {
  const router = useRouter();
  const handleClick = () => {
    const routerQuery = router.query;
    const { q, per_page } = routerQuery;
    const queryParams: Record<string, string | string[]> = {
      page: String(lastPage),
    };
    if (q) {
      queryParams.q = q;
    }
    if (per_page) {
      queryParams.per_page = per_page;
    }
    router.push({ query: queryParams });
  };
  return currentPage === lastPage ? (
    <button className={className} disabled onClick={handleClick}>
      End
    </button>
  ) : (
    <button className={className} onClick={handleClick}>
      End
    </button>
  );
}

export default EndBtn;
