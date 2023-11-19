import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { HttpResponse, PathParams, delay, http } from 'msw';
import { HttpRequestResolverExtras } from 'msw/lib/core/handlers/HttpHandler';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import InfoSection from '../components/InfoSection/InfoSection';
import { API } from '../constants/constants';
import appSlice, { changeItemsPerPage } from '../store/reducers/appSlice';
import { doomerApi } from '../store/reducers/doomerApi';
import { mockProductsData } from './mockData';

const responder = async ({ request }: { request: Request }) => {
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

const detailProductResponder = async ({
  params,
}: HttpRequestResolverExtras<PathParams>) => {
  const { id } = params;
  await delay(200);
  const productData = mockProductsData.find(
    (product) => product.id === Number(id)
  );
  return HttpResponse.json(productData);
};

const server = setupServer(
  http.get('https://dummyjson.com/products/search', responder),
  http.get('https://dummyjson.com/products', responder),
  http.get('https://dummyjson.com/products/:id', detailProductResponder)
);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Tests for the Card List component', () => {
  const verifyElementsCount = async (
    elementTestId: string,
    expectedCount: number
  ) => {
    const elementsOnScreen = await screen.findAllByTestId(elementTestId);
    expect(elementsOnScreen.length).toBe(expectedCount);
  };

  it('Verify that the component renders the specified number of cards', async () => {
    const store = configureStore({
      reducer: {
        appState: appSlice,
        [doomerApi.reducerPath]: doomerApi.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(doomerApi.middleware),
    });

    render(
      <BrowserRouter>
        <Provider store={store}>
          <InfoSection />
        </Provider>
      </BrowserRouter>
    );
    verifyElementsCount('cardElement', API.itemsPerPage);

    store.dispatch(changeItemsPerPage(15));
    verifyElementsCount('cardElement', 15);
  });

  it('Check that an appropriate message is displayed if no cards are present', async () => {
    const store = configureStore({
      reducer: {
        appState: appSlice,
        [doomerApi.reducerPath]: doomerApi.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(doomerApi.middleware),
    });

    render(
      <BrowserRouter>
        <Provider store={store}>
          <InfoSection />
        </Provider>
      </BrowserRouter>
    );
    store.dispatch(changeItemsPerPage(0));
    expect(await screen.findByText(/not found/));
  });
});
