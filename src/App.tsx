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

interface DataResult {
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
}

class App extends Component<Props, AppState> {
  state = {
    data: null,
    isLoaded: false,
  };

  updateData = (value: AppState) => {
    this.setState(value);
  };

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
