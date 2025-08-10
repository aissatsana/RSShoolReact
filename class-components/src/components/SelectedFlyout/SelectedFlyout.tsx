import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import type { Character } from '../../types';
import { clearSelected } from '../../providers/redux/selectedItemsSlice';
import './style.css';

interface SelectedFlyoutProps {
  items: Character[];
}

export const SelectedFlyout = ({ items }: SelectedFlyoutProps) => {
  const dispatch = useAppDispatch();
  const selectedIds = useAppSelector(
    (state) => state.selectedItems.selectedIds
  );
  if (selectedIds.length === 0) return null;

  const selectedData = items.filter((char) => selectedIds.includes(char.id));

  const handleUnselect = () => {
    dispatch(clearSelected());
  };

  const handleDownload = () => {
    const headers = ['ID', 'Name', 'Details URL'];
    const rows = selectedData.map((char: Character) => [
      char.id,
      char.name,
      `https://rickandmortyapi.com/character/${char.id}`,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((val: number | string) => `"${val}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = `${selectedIds.length}_items.csv`;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="flyout">
      <div>{selectedIds.length} item(s) selected</div>
      <div className="flyout__buttons">
        <button onClick={handleUnselect}>Unselect all</button>
        <button onClick={handleDownload}>Download</button>
      </div>
    </div>
  );
};
