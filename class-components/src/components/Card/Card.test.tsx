import { render, screen } from '@testing-library/react';
import { Card } from './Card';
import type { Character } from '../../types';

describe('Card component', () => {
  const fullCharacter: Character = {
    id: 1,
    name: 'Rick Sanchez',
    gender: 'Male',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  };

  const partialCharacter: Character = {
    id: 2,
    name: '',
    gender: '',
    image: '',
  };

  it('displays character info', () => {
    render(<Card item={fullCharacter} />);
    expect(screen.getByText(/rick sanchez/i)).toBeInTheDocument();
    expect(screen.getByText(/male/i)).toBeInTheDocument();
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', fullCharacter.image);
    expect(img).toHaveAttribute('alt', 'Rick Sanchez');
  });

  it('handles missing or undefined data gracefully', () => {
    render(<Card item={partialCharacter} />);
    expect(screen.queryByRole('img', { hidden: true })).not.toBeInTheDocument();
  });
});
