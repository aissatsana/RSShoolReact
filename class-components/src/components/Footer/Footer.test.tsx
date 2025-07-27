import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Footer } from './Footer';

describe('Footer', () => {
  it('renders Home and About links', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/about app/i)).toBeInTheDocument();
  });

  it('Home link has active class on "/" route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Footer />
      </MemoryRouter>
    );
    const homeLink = screen.getByText(/home/i);
    expect(homeLink.className).toMatch(/footer__link--active/);
  });

  it('About link has active class on "/about" route', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <Footer />
      </MemoryRouter>
    );
    const aboutLink = screen.getByText(/about app/i);
    expect(aboutLink.className).toMatch(/footer__link--active/);
  });
});
