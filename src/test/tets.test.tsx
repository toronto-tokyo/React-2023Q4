import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { act, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MainPage from '../pages/MainPage/MainPage';
import { mockProductsData } from './mockData';
import userEvent, { UserEvent } from '@testing-library/user-event';
import { API } from '../constants/constants';

const responder1 = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const limit = Number(url.searchParams.get('limit'));
  const searchTerm = url.searchParams.get('q');
  const response = {
    total: limit,
    skip: 0,
    limit: limit,
    products: searchTerm
      ? mockProductsData.filter(
          (item) =>
            !!Object.values(item).some((value) => {
              if (typeof value === 'string') {
                return value.includes(searchTerm);
              }
            })
        )
      : mockProductsData.slice(0, limit),
  };
  return HttpResponse.json(response);
};

const server = setupServer(
  http.get('https://dummyjson.com/products/search', responder1),
  http.get('https://dummyjson.com/products', responder1)
);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Tests for the Card List component', () => {
  const selectOptionByUser = async (
    user: UserEvent,
    selectElement: HTMLSelectElement,
    value: string
  ) => {
    await user.click(selectElement);
    await user.selectOptions(selectElement, value);
  };

  const verifyElementsCount = (
    elementTestId: string,
    expectedCount: number
  ) => {
    const elementsOnScreen = screen.getAllByTestId(elementTestId);
    expect(elementsOnScreen.length).toBe(expectedCount);
  };

  it('Verify that the component renders the specified number of cards', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    );
    await screen.findByText('Items / page');
    const selectElement = screen.getByTestId(
      'selectComponent'
    ) as HTMLSelectElement;
    verifyElementsCount('cardElement', API.itemsPerPage);
    await act(async () => {
      await selectOptionByUser(user, selectElement, '30');
    });
    verifyElementsCount('cardElement', 30);
    await act(async () => {
      await selectOptionByUser(user, selectElement, '70');
    });
    verifyElementsCount('cardElement', 70);
  });

  it('Check that an appropriate message is displayed if no cards are present', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    );
    const searchInput = screen.getByTestId(
      'searchInputElement'
    ) as HTMLInputElement;
    await act(async () => {
      await user.type(searchInput, 'invalidValue');
      await user.click(screen.getByRole('button', { name: 'Search' }));
    });
    expect(await screen.findByText(/not found/));
  });
});
