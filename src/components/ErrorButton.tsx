import { Component } from 'react';

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
    return <button onClick={this.handleClick}>Throw error!</button>;
  }
}
