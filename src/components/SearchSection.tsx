import { Component } from 'react';
import { Data } from '../App';

interface PropsInterface {
  updateData: (value: Data) => void;
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
      const response = await fetch(`${this.url}/?name=${searchValue}`);
      const json: Data = await response.json();
      this.props.updateData(json);
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
      <section>
        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.value}
            type="input"
            onChange={(e) => this.handleChange(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </section>
    );
  }
}
