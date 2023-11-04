import { BeerData } from '../types';

export class BeerAPI {
  static async getBeers(beerName: string): Promise<BeerData[]> {
    const url = beerName
      ? `https://api.punkapi.com/v2/beers?beer_name=${beerName}`
      : `https://api.punkapi.com/v2/beers`;
    const response = await fetch(url);
    const data: BeerData[] = await response.json();
    return data;
  }
}
