import React, { useState } from 'react';
import { useRouter } from 'next/router';
import classes from './Header.module.css';
import ErrorButton from '../UI/errorButton/errorButton';
import SearchButton from '../UI/searchButton/searchButton';
import { API } from '@/constants/constants';

interface IProps {
  searchTerm: string;
}

function Header({ searchTerm }: IProps) {
  const [searchValue, setSearchValue] = useState(searchTerm);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchValue(searchValue.trim());
    const routerQuery = router.query;
    const { per_page } = routerQuery;
    const queryParams: Record<string, string | string[]> = {
      page: String(API.initialPageNumber),
    };
    if (per_page) {
      queryParams.per_page = per_page;
    }
    if (searchValue) {
      queryParams.q = searchValue;
    }
    router.push({
      query: queryParams,
    });
  };

  return (
    <header className={classes.topBlock}>
      <form className={classes.search} onSubmit={handleSubmit}>
        <div className={classes.searchInner}>
          <input
            className={classes.searchBar}
            value={searchValue}
            type="input"
            onChange={(e) => setSearchValue(e.target.value)}
            data-testid="searchInputElement"
          />
          <SearchButton />
        </div>
      </form>
      <ErrorButton />
    </header>
  );
}

export default Header;
