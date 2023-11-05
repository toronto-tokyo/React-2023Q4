import { API } from '../constants/constants';
import { ProductData, ProductsData } from '../types';

export class DummyAPI {
  static async getProducts(
    search: string,
    pageNumber = API.initialPageNumber,
    perPage = API.itemsPerPage
  ): Promise<ProductsData> {
    const skip = (pageNumber - 1) * perPage;
    const queryParams = search
      ? `/search?q=${search}&limit=${perPage}&skip=${skip}`
      : `?limit=${perPage}&skip=${skip}`;

    const url = `https://dummyjson.com/products${queryParams}`;
    const response = await fetch(url);
    const data: ProductsData = await response.json();
    return data;
  }

  static async getProduct(id: number): Promise<ProductData> {
    const url = `https://dummyjson.com/products/${id}`;
    const response = await fetch(url);
    const data: ProductData = await response.json();
    return data;
  }
}
