import { Component } from 'react';
import './ErrorButton.css';

export class ErrorButton extends Component {
  state = {
    throwError: false,
  };

  handleClick = () => {
    this.setState({
      throwError: true,
    });
  };

  render() {
    if (this.state.throwError) throw new Error('Error');
    return (
      <button className="error_button" onClick={this.handleClick}>
        Throw error!
      </button>
    );
  }
}
