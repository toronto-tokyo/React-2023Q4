import { Component } from 'react';
import { DataResult } from '../App';
import './Card.css';

interface Props {
  itemData: DataResult;
}

export class Card extends Component<Props> {
  render() {
    const { itemData } = this.props;
    return (
      <div className="cards__item card">
        <img src={itemData.image} alt="avatar" className="card__img" />
        <div className="card__info">
          <p className="card__name">{itemData.name}</p>
          <p className="card__status">Status: {itemData.status}</p>
          <p className="card__specie">Specie: {itemData.species}</p>
        </div>
      </div>
    );
  }
}
