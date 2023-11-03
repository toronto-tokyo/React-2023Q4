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
          data.searchResponse?.length ? (
            <div className="cards">
              {data.searchResponse?.map((item) => (
                <Card key={item.id} itemData={item} />
              ))}
            </div>
          ) : (
            <h1 className="not_found">Not not found</h1>
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
