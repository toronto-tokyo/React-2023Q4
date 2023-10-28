import { Component } from 'react';
import { AppState, Data } from '../App';
import './InfoSection.css';
import { Card } from './Card';

interface PropsInterface {
  data: AppState;
}

interface StateInterface {
  data: Data | null;
}

export class InfoSection extends Component<PropsInterface, StateInterface> {
  state = {
    data: this.props.data.data,
  };

  componentDidUpdate(
    prevProps: Readonly<PropsInterface>,
    prevState: Readonly<StateInterface>
  ): void {
    const currentPropsIds = this.props.data.data?.results.map(
      (item) => item.id
    );
    const prevPropsIds = prevProps.data.data?.results.map((item) => item.id);
    const currenStateIds = this.state.data?.results.map((item) => item.id);
    const prevStateIds = prevState.data?.results.map((item) => item.id);
    if (
      currentPropsIds?.toString() !== prevPropsIds?.toString() ||
      currenStateIds?.toString() !== prevStateIds?.toString()
    ) {
      this.setState({
        data: this.props.data.data,
      });
    }
  }

  render() {
    return (
      <section className="cards">
        {this.props.data.isLoaded ? (
          this.state.data?.results?.length ? (
            this.state.data?.results.map((item) => (
              <Card key={item.id} itemData={item} />
            ))
          ) : (
            <h1>Not not found</h1>
          )
        ) : (
          <div className="loader">
            <div className="loader__icon"></div>
          </div>
        )}
      </section>
    );
  }
}
