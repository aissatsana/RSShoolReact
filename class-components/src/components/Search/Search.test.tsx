import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Search } from './Search';

describe('Search component', () => {
  const setup = (value = '') => {
    const onChange = vi.fn();
    const onSearch = vi.fn();

    render(<Search value={value} onChange={onChange} onSearch={onSearch} />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    return { input, button, onChange, onSearch };
  };

  it('renders input and search button', () => {
    const { input, button } = setup();
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('renders saved search term from props', () => {
    const term = 'Rick Sanchez';
    const { input } = setup(term);
    expect(input).toHaveValue(term);
  });

  it('renders empty input if no term passed', () => {
    const { input } = setup();
    expect(input).toHaveValue('');
  });

  it('calls onChange when user types', () => {
    const { input, onChange } = setup();
    fireEvent.change(input, { target: { value: 'Morty' } });
    expect(onChange).toHaveBeenCalled();
  });

  it('calls onSearch when search button is clicked', () => {
    const { button, onSearch } = setup();
    fireEvent.click(button);
    expect(onSearch).toHaveBeenCalled();
  });
});
