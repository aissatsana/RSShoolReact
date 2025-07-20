import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('App integration with localStorage', () => {
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

  it('loads saved searchTerm from localStorage on mount', () => {
    localStorageMock.setItem('searchTerm', 'Morty');

    render(<App />);
    expect(screen.getByDisplayValue('Morty')).toBeInTheDocument();
  });

  it('shows empty input if no searchTerm in localStorage', () => {
    render(<App />);
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('updates input on user typing', () => {
    render(<App />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Rick' } });
    expect(input).toHaveValue('Rick');
  });

  it('trims input, saves to localStorage, and calls fetch on search', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ results: [] }),
    });
    vi.stubGlobal('fetch', fetchMock);

    render(<App />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: '   Rick   ' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith('searchTerm', 'Rick');
      const lastCall = fetchMock.mock.calls.at(-1);
      expect(lastCall?.[0]).toContain('name=Rick');
    });
  });

  it('overwrites existing searchTerm in localStorage when there is a new search', async () => {
    localStorageMock.setItem('searchTerm', 'OldTerm');
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ results: [] }),
    });
    vi.stubGlobal('fetch', fetchMock);

    render(<App />);

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
