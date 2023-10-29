import { Component } from 'react';
import './ErrorPage.css';

export class ErrorPage extends Component {
  restartPage = () => {
    location.reload();
  };

  render() {
    return (
      <div className="error-page">
        <div className="error-page__inner">
          <h1 className="error-page__info">
            {`Ops..., something went wrong :(`}
          </h1>
          <button
            className="error-page__restart-btn"
            onClick={this.restartPage}
          >
            Restart
          </button>
        </div>
      </div>
    );
  }
}
