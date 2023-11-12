import classes from './SearchButton.module.css';

function SearchButton() {
  return (
    <button className={classes.searchButton} type="submit">
      Search
    </button>
  );
}

export default SearchButton;
