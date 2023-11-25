import React, { useState } from 'react';
import { useRouter } from 'next/router';
import classes from './Header.module.css';
import ErrorButton from '../UI/errorButton/errorButton';
import SearchButton from '../UI/searchButton/searchButton';

interface IProps {
  searchTerm: string;
}

function Header({ searchTerm }: IProps) {
  const [searchValue, setSearchValue] = useState(searchTerm);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchValue(searchValue.trim());
    router.push({
      query: searchValue ? { q: searchValue, page: 1 } : { page: 1 },
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
