import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

vi.mock('./components/Home', () => ({ Home: () => <div>HomePage</div> }));
vi.mock('./components/About', () => ({ About: () => <div>AboutPage</div> }));
vi.mock('./components/NotFound', () => ({
  NotFound: () => <div>NotFoundPage</div>,
}));
vi.mock('./components/Footer', () => ({
  Footer: () => (
    <footer>
      <a href="/">HomeLink</a>
      <a href="/about">AboutLink</a>
    </footer>
  ),
}));

describe('App routing', () => {
  it('renders Home on default route "/"', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/HomePage/i)).toBeInTheDocument();
  });

  it('renders About page on "/about"', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/AboutPage/i)).toBeInTheDocument();
  });

  it('renders NotFound page on unknown route', () => {
    render(
      <MemoryRouter initialEntries={['/something-wrong']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/NotFoundPage/i)).toBeInTheDocument();
  });
});
