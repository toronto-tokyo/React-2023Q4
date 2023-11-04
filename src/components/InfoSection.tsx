import { Component } from 'react';
import './InfoSection.css';
import { Card } from './Card';
import { BeerData } from '../types';

interface Props {
  beers: BeerData[];
}

export class InfoSection extends Component<Props> {
  render() {
    const { beers } = this.props;
    return (
      <section className="bottom_block">
        {beers.length ? (
          <div className="cards">
            {beers?.map((item) => <Card key={item.id} itemData={item} />)}
          </div>
        ) : (
          <h1 className="not_found">Not not found</h1>
        )}
      </section>
    );
  }
}
