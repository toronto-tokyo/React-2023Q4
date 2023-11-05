import { API } from '../constants/constants';
import { BeerData } from '../types';

export class BeerAPI {
  static async getBeers(
    beerName: string,
    pageNumber = API.initialPageNumber,
    perPage = API.itemsPerPage
  ): Promise<BeerData[]> {
    const queryParams = beerName
      ? `?page=${pageNumber}&per_page=${perPage}&beer_name=${beerName}`
      : `?page=${pageNumber}&per_page=${perPage}`;

    const url = `https://api.punkapi.com/v2/beers${queryParams}`;
    const response = await fetch(url);
    const data: BeerData[] = await response.json();
    return data;
  }
}
