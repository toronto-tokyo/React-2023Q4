import './App.css';
import { SearchSection } from './components/SearchSection';
import { InfoSection } from './components/InfoSection';
import { BeerData } from './types';
import { BeerAPI } from './API/BeerAPI';
import { useEffect, useState } from 'react';
import { SEARCH_TERM_STORAGE_KEY } from './constants/constants';
import Loader from './components/Loader/Loader';

function App() {
  const [beers, setBeers] = useState<BeerData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getBeers = async (value: string) => {
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
  };

  const delay = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
  };

  useEffect(() => {
    getBeers(searchTerm);
  }, [searchTerm]);

  return (
    <div className="wrapper">
      <SearchSection searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {isLoading ? <Loader /> : <InfoSection beers={beers} />}
    </div>
  );
}

export default App;
