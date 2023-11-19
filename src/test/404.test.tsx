import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

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
