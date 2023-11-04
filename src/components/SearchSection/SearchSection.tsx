import { useState } from 'react';
import ErrorButton from '../UI/ErrorButton/ErrorButton';
import SearchButton from '../UI/SearchButton/SearchButton';
import classes from './SearchSection.module.css';

interface Props {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

function SearchSection({ searchTerm, setSearchTerm }: Props) {
  const [searchValue, setSearchValue] = useState(searchTerm);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchValue(searchValue.trim());
    setSearchTerm(searchValue);
  };

  return (
    <section className={classes.topBlock}>
      <form className={classes.search} onSubmit={handleSubmit}>
        <div className={classes.searchInner}>
          <input
            className={classes.searchBar}
            value={searchValue}
            type="input"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <SearchButton />
        </div>
      </form>
      <ErrorButton />
    </section>
  );
}

export default SearchSection;
