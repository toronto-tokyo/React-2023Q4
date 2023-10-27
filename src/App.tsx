import { Component } from 'react';
import './App.css';
import { SearchSection } from './components/SearchSection';
import { InfoSection } from './components/InfoSection';

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

interface State {
  data: Data | null;
}

class App extends Component<Props, State> {
  state = {
    data: null,
  };

  updateData = (value: Data) => {
    this.setState({ data: value });
    console.log('App data', this.state.data);
  };

  render() {
    return (
      <>
        <SearchSection updateData={this.updateData} />
        <InfoSection data={this.state.data} />
      </>
    );
  }
}

export default App;
