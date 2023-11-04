import './App.css';
import { InfoSection } from './components/InfoSection';
import { BeerData } from './types';
import { BeerAPI } from './API/BeerAPI';
import { useCallback, useEffect, useState } from 'react';
import { SEARCH_TERM_STORAGE_KEY } from './constants/constants';
import Loader from './components/Loader/Loader';
import SearchSection from './components/SearchSection/SearchSection';

function App() {
  const [beers, setBeers] = useState<BeerData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getBeers = useCallback(async (value: string) => {
    localStorage.setItem(SEARCH_TERM_STORAGE_KEY, value);
    setIsLoading(true);
    try {
      const response = await BeerAPI.getBeers(value);
      setBeers(response);
      await delay();
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }, []);

  const delay = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
  };

  useEffect(() => {
    setSearchTerm(localStorage.getItem(SEARCH_TERM_STORAGE_KEY) || '');
  }, []);

  useEffect(() => {
    getBeers(searchTerm);
  }, [searchTerm, getBeers]);

  return (
    <div className="wrapper">
      <SearchSection searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {isLoading ? <Loader /> : <InfoSection beers={beers} />}
    </div>
  );
}

export default App;
