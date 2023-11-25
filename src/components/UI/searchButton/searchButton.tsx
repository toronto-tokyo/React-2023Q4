import React from 'react';
import classes from './searchButton.module.css';

function SearchButton() {
  return (
    <button className={classes.searchButton} type="submit">
      Search
    </button>
  );
}

export default SearchButton;
