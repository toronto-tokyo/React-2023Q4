import { Component } from 'react';
import { AppState } from '../App';
import { ErrorButton } from './ErrorButton';
import './SearchSection.css';

interface PropsInterface {
  data: AppState;
  updateData: (value: AppState) => void;
}

export class SearchSection extends Component<PropsInterface> {
  state = {
    value: this.props.data.searchTerm,
  };

  handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    this.handleChange(this.state.value.trim());
    this.props.updateData({
      ...this.props.data,
      searchTerm: this.state.value,
    });
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
