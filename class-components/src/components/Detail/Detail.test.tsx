import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Detail } from './Detail';
import { ErrorBoundary } from '../ErrorBoundary';

const mockCharacter = {
  id: 1,
  name: 'Rick Sanchez',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  gender: 'Male',
  species: 'Human',
  status: 'Alive',
  location: { name: 'Earth' },
};

describe('Detail component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loader and then character details', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockCharacter),
      })
    );

    render(
      <ErrorBoundary>
        <Detail id={1} onClose={vi.fn()} />
      </ErrorBoundary>
    );

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

    render(
      <ErrorBoundary>
        <Detail id={1} onClose={vi.fn()} />
      </ErrorBoundary>
    );

    await waitFor(() =>
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    );
  });

  it('calls onClose when close button is clicked', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockCharacter),
      })
    );

    const onClose = vi.fn();
    render(
      <ErrorBoundary>
        <Detail id={1} onClose={onClose} />
      </ErrorBoundary>
    );
    await screen.findByText(/Rick Sanchez/i);

    fireEvent.click(screen.getByRole('button'));
    expect(onClose).toHaveBeenCalled();
  });
});
