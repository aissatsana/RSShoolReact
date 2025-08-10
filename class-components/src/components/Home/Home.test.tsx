import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { Home } from './Home';
import { renderWithProviders } from '../../test-utils';
import { baseApi } from '../../api/baseApi';

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
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            info: { pages: 1, count: 1, next: null, prev: null },
            results: [{ id: 2, name: 'Morty Smith', image: '' }],
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        )
      )
    );

    renderWithProviders(<Home />);
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

    renderWithProviders(<Home />);
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('updates input on user typing', () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ info: { pages: 1 }, results: [] }),
      })
    );

    renderWithProviders(<Home />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Rick' } });
    expect(input).toHaveValue('Rick');
  });

  it('trims input, saves to localStorage, and calls fetch on search', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      headers: {
        get: (k: string) =>
          k.toLowerCase() === 'content-type' ? 'application/json' : null,
      },
      json: async () => ({
        info: { pages: 1 },
        results: [{ id: 1, name: 'Rick Sanchez', gender: 'Male', image: '' }],
      }),
    });
    vi.stubGlobal('fetch', fetchMock);

    renderWithProviders(<Home />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: '   Rick   ' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'searchTerm',
        '   Rick   '
      );

      const lastArg = fetchMock.mock.calls.at(-1)?.[0] as string | Request;
      const urlStr = typeof lastArg === 'string' ? lastArg : lastArg.url;
      const fullUrl = new URL(urlStr);
      expect(fullUrl.pathname).toMatch(/\/character\/?$/);
      expect(fullUrl.searchParams.get('name')).toBe('Rick');
      expect(fullUrl.searchParams.get('page')).toBe('1');
    });

    const lastArg = fetchMock.mock.calls.at(-1)?.[0] as string | Request;
    const url = typeof lastArg === 'string' ? lastArg : lastArg.url;
    expect(url).not.toContain('Rick%20%20%20');
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

    renderWithProviders(<Home />);

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

    renderWithProviders(<Home />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('shows error message on fetch failure (network error)', async () => {
    vi.stubGlobal('fetch', () => Promise.reject(new Error('Network error')));

    renderWithProviders(<Home />);
    await waitFor(() =>
      expect(
        screen.getByText(/there are no such characters/i)
      ).toBeInTheDocument()
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

    renderWithProviders(<Home />);

    await waitFor(() =>
      expect(
        screen.getByText(/there are no such characters/i)
      ).toBeInTheDocument()
    );
  });

  it('shows Retry on error and triggers refetch on click', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ error: 'fail' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        })
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ error: 'fail-again' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        })
      );

    vi.stubGlobal('fetch', fetchMock);

    renderWithProviders(<Home />);
    const retryBtn = await screen.findByRole('button', { name: /retry/i });
    expect(retryBtn).toBeInTheDocument();

    fireEvent.click(retryBtn);
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
  });
});
