import { Component } from 'react';
import './App.css';
import { SearchSection } from './components/SearchSection';
import { InfoSection } from './components/InfoSection';
import { ErrorBoundary } from './components/ErrorBoundary';

export interface Data {
  info: DataInfo;
  results: DataResult[];
}

interface DataInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface DataResult {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

interface Props {}

export interface AppState {
  data: Data | null;
  isLoaded: boolean;
  searchTerm: string;
}

const STORAGE_KEY = 'searchTerm';

class App extends Component<Props, AppState> {
  state = {
    data: null,
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
      const json: Data = await response.json();
      this.updateData({ ...this.state, data: json, isLoaded: true });
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
