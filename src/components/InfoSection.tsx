import { Component } from 'react';
import { AppState } from '../App';
import './InfoSection.css';
import { Card } from './Card';

interface Props {
  data: AppState;
}

export class InfoSection extends Component<Props> {
  render() {
    const { data } = this.props;
    return (
      <section className="bottom_block">
        {data.isLoaded ? (
          data.searchResponse?.results?.length ? (
            <div className="cards">
              {data.searchResponse?.results.map((item) => (
                <Card key={item.id} itemData={item} />
              ))}
            </div>
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
