import { Component } from 'react';
import { BeerData } from '../types';
import './Card.css';

interface Props {
  itemData: BeerData;
}

export class Card extends Component<Props> {
  render() {
    const { itemData } = this.props;
    return (
      <div className="cards__item card">
        <img src={itemData.image_url} alt="avatar" className="card__img" />
        <div className="card__info">
          <p className="card__name">{itemData.name}</p>
          <p className="card__status">Tagline: {itemData.tagline}</p>
          <p className="card__specie">Volume: {itemData.volume.value}</p>
        </div>
      </div>
    );
  }
}
