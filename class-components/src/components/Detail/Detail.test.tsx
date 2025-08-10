import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor, fireEvent } from '@testing-library/react';
import { Detail } from './Detail';
import { renderWithProviders } from '../../test-utils';

const mockCharacter = {
  id: 1,
  name: 'Rick Sanchez',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  gender: 'Male',
  species: 'Human',
  status: 'Alive',
  location: { name: 'Earth' },
};

beforeEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('Detail component', () => {
  it('shows loader and then character details', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation(
        () =>
          new Promise<Response>((resolve) =>
            setTimeout(() => {
              resolve(
                new Response(JSON.stringify(mockCharacter), {
                  status: 200,
                  headers: { 'Content-Type': 'application/json' },
                })
              );
            }, 300)
          )
      )
    );

    renderWithProviders(<Detail id={1} onClose={vi.fn()} />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await screen.findByText(/Rick Sanchez/i);
    expect(screen.getByAltText(/Rick Sanchez/i)).toHaveAttribute(
      'src',
      'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
    );
    expect(screen.getByText(/Human/)).toBeInTheDocument();
    expect(screen.getByText(/Earth/)).toBeInTheDocument();
  });

  it('shows error message if fetch fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
      })
    );

    renderWithProviders(<Detail id={1} onClose={vi.fn()} />);

    await waitFor(() =>
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    );
  });

  it('calls onClose when close button is clicked', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation(
        () =>
          new Promise<Response>((resolve) =>
            resolve(
              new Response(JSON.stringify(mockCharacter), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
              })
            )
          )
      )
    );

    const onClose = vi.fn();
    renderWithProviders(<Detail id={1} onClose={onClose} />);
    await screen.findByText(/Rick Sanchez/i);

    fireEvent.click(screen.getByRole('button'));
    expect(onClose).toHaveBeenCalled();
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

    renderWithProviders(<Detail id={1} onClose={vi.fn()} />);
    const retryBtn = await screen.findByRole('button', { name: /retry/i });
    expect(retryBtn).toBeInTheDocument();

    fireEvent.click(retryBtn);
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
  });
});
