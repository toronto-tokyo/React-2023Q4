import { Component } from 'react';
import './SearchSection.css';
import ErrorButton from './UI/ErrorButton/ErrorButton';

interface Props {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export class SearchSection extends Component<Props> {
  state = {
    value: this.props.searchTerm,
  };

  handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    this.handleChange(this.state.value.trim());
    this.props.setSearchTerm(this.state.value);
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
