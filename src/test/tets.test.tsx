import { act, render, screen } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';
import { delay, http, HttpResponse, PathParams } from 'msw';
import { setupServer } from 'msw/node';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import App from '../App';
import { API } from '../constants/constants';
import MainPage from '../pages/MainPage/MainPage';
import { mockProductsData } from './mockData';
import Card from '../components/Card/Card';
import { HttpRequestResolverExtras } from 'msw/lib/core/handlers/HttpHandler';

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

describe('Tests for the 404 Page component', () => {
  it('Ensure that the 404 page is displayed when navigating to an invalid route.', () => {
    const invalidRoute = '/qwe/rty';
    render(
      <MemoryRouter initialEntries={[invalidRoute]}>
        <App></App>
      </MemoryRouter>
    );
    expect(screen.getByText(/something went wrong/i));
  });
});

describe('Tests for the Card component', () => {
  it('Ensure that the card component renders the relevant card data', () => {
    const productData = mockProductsData[0];
    render(
      <BrowserRouter>
        <Card itemData={productData} />
      </BrowserRouter>
    );
    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img.src).toBe(productData.images[0]);
    expect(screen.getByText(productData.title));
    expect(screen.getByText(`Brand: ${productData.brand}`));
    expect(screen.getByText(`Price: ${productData.price}`));
  });

  it('Validate that clicking on a card opens a detailed card component', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    await screen.findAllByTestId('cardElement');
    const card = screen.getAllByTestId('cardElement')[0];
    await user.click(card);
    expect(await screen.findByTestId('detailedCard'));
  });

  it('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    const user = userEvent.setup();
    const fetchSpy = vi.spyOn(window, 'fetch');
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    await screen.findAllByTestId('cardElement');
    const card = screen.getAllByTestId('cardElement')[0];
    await user.click(card);
    const productId = window.location.href.split('?')[0].split('/').at(-1);
    expect(fetchSpy).toHaveBeenCalledWith(
      `https://dummyjson.com/products/${productId}`
    );
  });
});

describe('Tests for the Detailed Card component', () => {
  it('Check that a loading indicator is displayed while fetching data', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <App />
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
    render(
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    );
    const closeButton = await screen.findByRole('button', { name: 'Close' });
    await user.click(closeButton);
    expect(screen.queryByTestId('detailedCard')).toBeNull();
  });
});
