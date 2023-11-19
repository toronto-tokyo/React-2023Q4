import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HttpResponse, PathParams, delay, http } from 'msw';
import { HttpRequestResolverExtras } from 'msw/lib/core/handlers/HttpHandler';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import App from '../App';
import appSlice from '../store/reducers/appSlice';
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

describe('Tests for the Detailed Card component', () => {
  it('Check that a loading indicator is displayed while fetching data', async () => {
    const user = userEvent.setup();
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
          <App />
        </Provider>
      </BrowserRouter>
    );
    await screen.findAllByTestId('cardElement');
    const card = screen.getAllByTestId('cardElement')[0];
    await user.click(card);
    expect(await screen.findByTestId('loader'));
    expect(await screen.findByTestId('detailedCard'));
  });
  it('Ensure that clicking the close button hides the component', async () => {
    const user = userEvent.setup();
    const path = '/1';
    const store = configureStore({
      reducer: {
        appState: appSlice,
        [doomerApi.reducerPath]: doomerApi.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(doomerApi.middleware),
    });
    render(
      <MemoryRouter initialEntries={[path]}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );
    const closeButton = await screen.findByRole('button', { name: 'Close' });
    await user.click(closeButton);
    expect(screen.queryByTestId('detailedCard')).toBeNull();
  });
});
