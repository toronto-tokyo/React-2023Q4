import { Component } from 'react';
import { AppState, Data } from '../App';
import { ErrorButton } from './ErrorButton';
import './SearchSection.css';

interface PropsInterface {
  data: AppState;
  updateData: (value: AppState) => void;
}

const STORAGE_KEY = 'searchTerm';

export class SearchSection extends Component<PropsInterface> {
  url = 'https://rickandmortyapi.com/api/character';

  state = {
    value: localStorage.getItem(STORAGE_KEY) || '',
  };

  componentDidMount(): void {
    (async () => {
      await this.searchInfo(this.state.value);
    })();
  }

  componentWillUnmount(): void {
    (async () => await this.searchInfo(''))();
  }

  async searchInfo(searchValue: string): Promise<void> {
    try {
      this.props.updateData({ ...this.props.data, isLoaded: false });
      const response = await fetch(`${this.url}/?name=${searchValue}`);
      const json: Data = await response.json();
      this.props.updateData({ ...this.props.data, data: json, isLoaded: true });
    } catch (error) {
      console.log(error);
    }
  }

  handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    await this.searchInfo(this.state.value);
    localStorage.setItem(STORAGE_KEY, this.state.value);
  };

  handleChange = (value: string) => {
    this.setState({
      value,
    });
  };

  render() {
    return (
      <section className="top_block">
        <form className="search" onSubmit={this.handleSubmit}>
          <div className="search__inner">
            <input
              className="search__bar"
              value={this.state.value}
              type="input"
              onChange={(e) => this.handleChange(e.target.value)}
            />
            <button className="search__button" type="submit">
              Search
            </button>
          </div>
        </form>
        <ErrorButton />
      </section>
    );
  }
}
