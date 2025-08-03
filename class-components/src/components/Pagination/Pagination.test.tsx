import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from './Pagination';
import { vi } from 'vitest';

describe('Pagination component', () => {
  it('renders current page and total pages', () => {
    render(<Pagination page={2} totalPages={5} onPageChange={() => {}} />);
    expect(screen.getByText('Page 2 of 5')).toBeInTheDocument();
  });

  it('calls onPageChange with previous page on Back click', () => {
    const onPageChange = vi.fn();
    render(<Pagination page={2} totalPages={5} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByRole('button', { name: /back/i }));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it('calls onPageChange with next page on Forward click', () => {
    const onPageChange = vi.fn();
    render(<Pagination page={2} totalPages={5} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByRole('button', { name: /forward/i }));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('disables Back button on first page', () => {
    render(<Pagination page={1} totalPages={5} onPageChange={() => {}} />);
    expect(screen.getByRole('button', { name: /back/i })).toBeDisabled();
  });

  it('disables Forward button on last page', () => {
    render(<Pagination page={5} totalPages={5} onPageChange={() => {}} />);
    expect(screen.getByRole('button', { name: /forward/i })).toBeDisabled();
  });
});
