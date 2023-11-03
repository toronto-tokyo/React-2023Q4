import { BeerData } from '../types';

export class BeerAPI {
  static async getBeers(beerName: string): Promise<BeerData[]> {
    const url = `https://api.punkapi.com/v2/beers?_beer_name=${beerName}`;
    const response = await fetch(url);
    const data: BeerData[] = await response.json();
    return data;
  }
}
