'use client';

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import type { Character } from '../../types';
import { clearSelected } from '../../providers/redux/selectedItemsSlice';
import styles from './SelectedFlyout.module.css';
import { useTranslations } from 'next-intl';
import { useEffect, useActionState, useMemo } from 'react';
import { buildCsvAction } from '../../app/actions/exportCsv';

interface SelectedFlyoutProps {
  items: Character[];
}

export const SelectedFlyout = ({ items }: SelectedFlyoutProps) => {
  const t = useTranslations('Select');
  const dispatch = useAppDispatch();
  const selectedIds = useAppSelector(
    (state) => state.selectedItems.selectedIds
  );

  const selectedData = useMemo(
    () => items.filter((c) => selectedIds.includes(c.id)),
    [items, selectedIds]
  );

  const formValue = useMemo(
    () => JSON.stringify(selectedData.map(({ id, name }) => ({ id, name }))),
    [selectedData]
  );

  const handleUnselect = () => {
    dispatch(clearSelected());
  };

  const [result, formAction, pending] = useActionState(buildCsvAction, null);

  useEffect(() => {
    if (!result || !result.ok) return;
    const blob = new Blob([result.csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = result.filename;
    a.click();
    URL.revokeObjectURL(url);
  }, [result]);

  if (selectedIds.length === 0) return null;

  return (
    <div className={styles.flyout}>
      <div>
        {selectedIds.length} {t('item(s) selected')}
      </div>

      <div className={styles.flyout__buttons}>
        <button onClick={handleUnselect}>{t('Unselect all')}</button>

        <form className={styles.flyout__form} action={formAction}>
          <input type="hidden" name="chars" value={formValue} />
          <button type="submit" disabled={pending}>
            {pending ? t('Preparing') : t('Download')}
          </button>
        </form>
      </div>
    </div>
  );
};
