import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Home } from './Home';
import { MemoryRouter } from 'react-router-dom';
import { ErrorBoundary } from '../ErrorBoundary';

describe('Home integration with localStorage', () => {
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: vi.fn((key) => store[key] || null),
      setItem: vi.fn((key, value) => {
        store[key] = value;
      }),
      clear: () => {
        store = {};
      },
    };
  })();

  beforeEach(() => {
    vi.stubGlobal('localStorage', localStorageMock);
    localStorageMock.clear();
    vi.restoreAllMocks();
  });

  it('loads saved searchTerm from localStorage on mount', async () => {
    localStorageMock.setItem('searchTerm', 'Morty');

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          info: { pages: 1 },
          results: [{ id: 2, name: 'Morty Smith', image: '' }],
        }),
      })
    );

    render(
      <MemoryRouter>
        <ErrorBoundary>
          <Home />
        </ErrorBoundary>
      </MemoryRouter>
    );
    expect(screen.getByDisplayValue('Morty')).toBeInTheDocument();
    await screen.findByText(/Morty Smith/i);
  });

  it('shows empty input if no searchTerm in localStorage', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          info: { pages: 1 },
          results: [],
        }),
      })
    );

    render(
      <MemoryRouter>
        <ErrorBoundary>
          <Home />
        </ErrorBoundary>
      </MemoryRouter>
    );
    expect(screen.getByRole('textbox')).toHaveValue('');
    expect(await screen.findByText(/no characters found/i)).toBeInTheDocument();
  });

  it('updates input on user typing', () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ info: { pages: 1 }, results: [] }),
      })
    );

    render(
      <MemoryRouter>
        <ErrorBoundary>
          <Home />
        </ErrorBoundary>
      </MemoryRouter>
    );
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Rick' } });
    expect(input).toHaveValue('Rick');
  });

  it('trims input, saves to localStorage, and calls fetch on search', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        info: { pages: 1 },
        results: [{ id: 1, name: 'Rick Sanchez', gender: 'Male', image: '' }],
      }),
    });
    vi.stubGlobal('fetch', fetchMock);

    render(
      <MemoryRouter>
        <ErrorBoundary>
          <Home />
        </ErrorBoundary>
      </MemoryRouter>
    );

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: '   Rick   ' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'searchTerm',
        '   Rick   '
      );
      const lastCall = fetchMock.mock.calls.at(-1);
      expect(lastCall?.[0]).toContain('name=Rick');
    });
  });

  it('overwrites existing searchTerm in localStorage when there is a new search', async () => {
    localStorageMock.setItem('searchTerm', 'OldTerm');
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        info: { pages: 1 },
        results: [],
      }),
    });
    vi.stubGlobal('fetch', fetchMock);

    render(
      <MemoryRouter>
        <ErrorBoundary>
          <Home />
        </ErrorBoundary>
      </MemoryRouter>
    );

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'NewTestValue' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'searchTerm',
        'NewTestValue'
      );
    });
  });
});

describe('Home error and loading states', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('displays loader while fetching data', async () => {
    vi.stubGlobal(
      'fetch',
      () =>
        new Promise((resolve) =>
          setTimeout(() => {
            resolve({
              ok: true,
              json: async () => ({
                info: { pages: 1 },
                results: [],
              }),
            });
          }, 300)
        )
    );

    render(
      <MemoryRouter>
        <ErrorBoundary>
          <Home />
        </ErrorBoundary>
      </MemoryRouter>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    expect(await screen.findByText(/no characters found/i)).toBeInTheDocument();
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });

  it('shows error message on fetch failure (network error)', async () => {
    vi.stubGlobal('fetch', () => Promise.reject(new Error('Network error')));

    render(
      <MemoryRouter>
        <ErrorBoundary>
          <Home />
        </ErrorBoundary>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    );
  });

  it('shows error UI on HTTP error', async () => {
    vi.stubGlobal('fetch', () =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: async () => ({}),
      })
    );

    render(
      <MemoryRouter>
        <ErrorBoundary>
          <Home />
        </ErrorBoundary>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    );
  });

  it('renders empty state if fetch returns no characters', async () => {
    vi.stubGlobal('fetch', () =>
      Promise.resolve({
        ok: true,
        json: async () => ({
          info: { pages: 1 },
          results: [],
        }),
      })
    );

    render(
      <MemoryRouter>
        <ErrorBoundary>
          <Home />
        </ErrorBoundary>
      </MemoryRouter>
    );
    expect(await screen.findByText(/no characters found/i)).toBeInTheDocument();
  });
});
