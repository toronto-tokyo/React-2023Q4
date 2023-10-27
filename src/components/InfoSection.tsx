import { Component } from 'react';
import { Data } from '../App';
import './InfoSection.css';

interface PropsInterface {
  data: Data | null;
}

interface StateInterface {
  data: Data | null;
}

export class InfoSection extends Component<PropsInterface, StateInterface> {
  state = {
    data: this.props.data,
  };

  componentDidUpdate(
    prevProps: Readonly<PropsInterface>,
    prevState: Readonly<StateInterface>
  ): void {
    const currentPropsIds = this.props.data?.results.map((item) => item.id);
    const prevPropsIds = prevProps.data?.results.map((item) => item.id);
    const currenStateIds = this.state.data?.results.map((item) => item.id);
    const prevStateIds = prevState.data?.results.map((item) => item.id);
    if (
      currentPropsIds?.toString() !== prevPropsIds?.toString() ||
      currenStateIds?.toString() !== prevStateIds?.toString()
    ) {
      this.setState({
        data: this.props.data,
      });
    }
  }

  render() {
    console.log(this.state.data);
    return (
      <section className="cards">
        {this.state.data?.results &&
          this.state.data.results.map((item) => (
            <div key={item.id} className="cards__item card">
              <img src={item.image} alt="avatar" className="card__img" />
              <p className="card__name">{item.name}</p>
              <p className="card__status">Status: {item.status}</p>
              <p className="card__specie">Specie: {item.species}</p>
            </div>
          ))}
      </section>
    );
  }
}
