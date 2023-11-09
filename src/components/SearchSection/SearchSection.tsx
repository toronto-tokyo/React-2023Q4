import { useContext, useState } from 'react';
import ErrorButton from '../UI/ErrorButton/ErrorButton';
import SearchButton from '../UI/SearchButton/SearchButton';
import classes from './SearchSection.module.css';
import { useNavigate } from 'react-router-dom';
import { API } from '../../constants/constants';
import {
  StateContext,
  StateDispatchContext,
} from '../../stateContext/StateContext';

function SearchSection() {
  const state = useContext(StateContext);
  const dispatchState = useContext(StateDispatchContext);
  const [searchValue, setSearchValue] = useState(state?.searchTerm ?? '');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`?page=${API.initialPageNumber}`);
    setSearchValue(searchValue.trim());
    dispatchState &&
      dispatchState({
        type: 'change-search-term',
        searchTerm: searchValue,
      });
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
