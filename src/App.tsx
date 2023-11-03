import { Component } from 'react';
import './App.css';
import { SearchSection } from './components/SearchSection';
import { InfoSection } from './components/InfoSection';
import { BeerData } from './types';
import { BeerAPI } from './API/BeerAPI';

interface Props {}

export interface AppState {
  searchResponse: BeerData[] | null;
  isLoaded: boolean;
  searchTerm: string;
}

const STORAGE_KEY = 'searchTerm';

class App extends Component<Props, AppState> {
  state = {
    searchResponse: null,
    isLoaded: false,
    searchTerm: localStorage.getItem(STORAGE_KEY) || '',
  };

  updateData = (value: AppState) => {
    this.setState(value);
    localStorage.setItem(STORAGE_KEY, this.state.searchTerm);
  };

  componentDidMount(): void {
    (async () => {
      await this.searchInfo(this.state.searchTerm);
    })();
  }

  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<AppState>
  ): void {
    if (this.state.searchTerm !== prevState.searchTerm) {
      this.searchInfo(this.state.searchTerm);
    }
  }

  componentWillUnmount(): void {
    (async () => await this.searchInfo(''))();
  }

  async searchInfo(searchValue: string): Promise<void> {
    try {
      localStorage.setItem(STORAGE_KEY, this.state.searchTerm);
      this.updateData({ ...this.state, isLoaded: false });
      const response = await BeerAPI.getBeers(searchValue);
      await new Promise((resolve) => setTimeout(resolve, 500));
      this.updateData({
        ...this.state,
        searchResponse: response,
        isLoaded: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="wrapper">
        <SearchSection data={this.state} updateData={this.updateData} />
        <InfoSection data={this.state} />
      </div>
    );
  }
}

export default App;
