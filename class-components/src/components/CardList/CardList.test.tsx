import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CardList } from './CardList';
import type { Character } from '../../types';

describe('CardList', () => {
  const characters: Character[] = [
    {
      id: 1,
      name: 'Rick Sanchez',
      gender: 'Male',
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    },
    {
      id: 2,
      name: '',
      gender: '',
      image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    },
  ];

  it('renders correct number of items', () => {
    render(<CardList items={characters} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('displays character names and gender', () => {
    render(<CardList items={characters} />);
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Male')).toBeInTheDocument();
  });

  it('handles missing name and gender gracefully', () => {
    render(<CardList items={characters} />);
    expect(screen.getAllByRole('heading')).toHaveLength(2);
    expect(screen.getAllByRole('heading')[1]).toHaveTextContent('');
    expect(screen.getAllByText('')[1]).toBeInTheDocument();
  });

  it('renders "No characters found" when items is empty', () => {
    render(<CardList items={[]} />);
    expect(screen.getByText(/no characters found/i)).toBeInTheDocument();
  });

  it('renders "No characters found" when items is undefined', () => {
    render(<CardList />);
    expect(screen.getByText(/no characters found/i)).toBeInTheDocument();
  });
});
