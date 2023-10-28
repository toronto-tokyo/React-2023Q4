import { Component } from 'react';
import { AppState } from '../App';
import './InfoSection.css';
import { Card } from './Card';

interface PropsInterface {
  data: AppState;
}

export class InfoSection extends Component<PropsInterface> {
  render() {
    const { data } = this.props;
    return (
      <section className="cards">
        {data.isLoaded ? (
          data.data?.results?.length ? (
            data.data?.results.map((item) => (
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
