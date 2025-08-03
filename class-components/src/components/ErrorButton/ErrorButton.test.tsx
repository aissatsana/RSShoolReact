import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorButton } from './ErrorButton';
import { ErrorBoundary } from '../ErrorBoundary';

describe('ErrorButton', () => {
  it('throws error when clicked', () => {
    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    const button = screen.getByRole('button', {
      name: /simulate server error/i,
    });
    fireEvent.click(button);

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/oops/i)).toBeInTheDocument();
  });
});
