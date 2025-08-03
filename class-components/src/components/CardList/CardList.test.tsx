import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CardList } from './CardList';
import type { Character } from '../../types';
import { renderWithProviders } from '../../test-utils';

describe('CardList', () => {
  const characters: Character[] = [
    {
      id: 1,
      name: 'Rick Sanchez',
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    },
    {
      id: 2,
      name: '',
      image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    },
  ];
  const selectFoo = vi.fn();

  it('renders correct number of items', () => {
    renderWithProviders(<CardList items={characters} onSelect={selectFoo} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('displays character names and gender', () => {
    renderWithProviders(<CardList items={characters} onSelect={selectFoo} />);
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
  });

  it('handles missing name and gender gracefully', () => {
    renderWithProviders(<CardList items={characters} onSelect={selectFoo} />);
    expect(screen.getAllByRole('heading')).toHaveLength(2);
    expect(screen.getAllByRole('heading')[1]).toHaveTextContent('');
    expect(screen.getAllByText('')[1]).toBeInTheDocument();
  });

  it('renders "No characters found" when items is empty', () => {
    renderWithProviders(<CardList items={[]} onSelect={selectFoo} />);
    expect(screen.getByText(/no characters found/i)).toBeInTheDocument();
  });
});
