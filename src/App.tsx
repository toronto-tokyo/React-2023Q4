import { Component } from 'react';
import './App.css';
import { SearchSection } from './components/SearchSection';
import { InfoSection } from './components/InfoSection';
import { ErrorBoundary } from './components/ErrorBoundary';
import { SearchResponse } from './types';

interface Props {}

export interface AppState {
  searchResponse: SearchResponse | null;
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

  url = 'https://rickandmortyapi.com/api/character';

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
      const response = await fetch(`${this.url}/?name=${searchValue}`);
      const json: SearchResponse = await response.json();
      this.updateData({ ...this.state, searchResponse: json, isLoaded: true });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <ErrorBoundary>
        <div className="wrapper">
          <SearchSection data={this.state} updateData={this.updateData} />
          <InfoSection data={this.state} />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
