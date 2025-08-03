import { render, screen } from '@testing-library/react';
import { Card } from './Card';
import type { Character } from '../../types';
import { vi } from 'vitest';

describe('Card component', () => {
  const fullCharacter: Character = {
    id: 1,
    name: 'Rick Sanchez',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  };

  const partialCharacter: Character = {
    id: 2,
    name: '',
    image: '',
  };
  const mockOnClickButton = vi.fn();
  const mockOnToggleSelect = vi.fn();

  it('displays character info', () => {
    render(
      <Card
        item={fullCharacter}
        onClickButton={mockOnClickButton}
        isSelected={false}
        onToggleSelect={mockOnToggleSelect}
      />
    );
    expect(screen.getByText(/rick sanchez/i)).toBeInTheDocument();
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', fullCharacter.image);
    expect(img).toHaveAttribute('alt', 'Rick Sanchez');
  });

  it('handles missing or undefined data gracefully', () => {
    render(
      <Card
        item={partialCharacter}
        onClickButton={mockOnClickButton}
        isSelected={false}
        onToggleSelect={mockOnToggleSelect}
      />
    );
    expect(screen.queryByRole('img', { hidden: true })).not.toBeInTheDocument();
  });
});
