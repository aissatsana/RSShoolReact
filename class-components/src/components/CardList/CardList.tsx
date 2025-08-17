'use client';

import { type FC } from 'react';
import type { Character } from '../../types';
import { Card } from '../Card';
import { toggleSelected } from '../../providers/redux/selectedItemsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import styles from './CardList.module.css';
import { useTranslations } from 'next-intl';

interface CardListProps {
  items?: Character[];
  onSelect: (id: number) => void;
  selectedId?: number | null;
}

export const CardList: FC<CardListProps> = ({ items, onSelect }) => {
  const t = useTranslations('utils');
  const dispatch = useAppDispatch();
  const selectedIds = useAppSelector(
    (state) => state.selectedItems.selectedIds
  );

  const handleToggleSelect = (id: number) => {
    dispatch(toggleSelected(id));
  };

  const handleButtonClick = (id: number) => {
    onSelect(id);
  };

  if (!items || items.length === 0) {
    return <p>{t('No characters found')}</p>;
  }

  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item.id}>
          <Card
            item={item}
            onClickButton={handleButtonClick}
            isSelected={selectedIds.includes(item.id)}
            onToggleSelect={handleToggleSelect}
          />
        </li>
      ))}
    </ul>
  );
};
