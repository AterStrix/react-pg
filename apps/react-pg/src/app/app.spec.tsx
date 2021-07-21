import { render, findByText, findByTestId } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './app';

const mockFetch = (data: never[]) => jest.fn().mockImplementation(() => Promise.resolve({ ok: true, json: () => data }));

describe('App', () => {
  beforeEach(() => {
    window.fetch = mockFetch([]);
  });

  it('should render successfully', async () => {
    const { baseElement } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const element = await findByTestId(baseElement as HTMLElement, 'app-container');
    expect(element).toBeTruthy();
  });

  it('should have a greeting as the title', async () => {
    const { baseElement } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(await findByText(baseElement as HTMLElement, 'Board Game Hoard')).toBeTruthy();
  });
});
