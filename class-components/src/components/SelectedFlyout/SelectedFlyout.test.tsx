import { describe, it, expect } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { SelectedFlyout } from './SelectedFlyout';
import { renderWithProviders } from '../../test-utils';

const items = [
  { id: 1, name: 'Rick', image: '' },
  { id: 2, name: 'Morty', image: '' },
];

describe('SelectedFlyout render and logics', () => {
  it('does not render when there are no selected items', () => {
    const items = [
      { id: 1, name: 'Rick', image: '' },
      { id: 2, name: 'Morty', image: '' },
    ];
    const { container } = renderWithProviders(<SelectedFlyout items={items} />);

    expect(container.firstChild).toBeNull();
  });

  it('unselect button clears selection and hides component', async () => {
    const { container, store } = renderWithProviders(
      <SelectedFlyout items={items} />,
      {
        preloadedState: {
          selectedItems: { selectedIds: [1, 2] },
        },
      }
    );

    expect(screen.getByText(/2 item\(s\) selected/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /unselect all/i }));
    expect(store.getState().selectedItems.selectedIds).toHaveLength(0);
    expect(container.firstChild).toBeNull();
  });
});
