import { type FC } from 'react';
import type { Character } from '../../types';
import { Card } from '../Card';
import './style.css';

interface CardListProps {
  items?: Character[];
  onSelect: (id: number) => void;
  selectedId?: number | null;
}

export const CardList: FC<CardListProps> = ({ items, onSelect }) => {
  if (!items || items.length === 0) {
    return <p>No characters found</p>;
  }

  return (
    <ul className="list">
      {items.map((item) => (
        <li
          className="list__item"
          key={item.id}
          onClick={() => onSelect(item.id)}
        >
          <Card item={item} />
        </li>
      ))}
    </ul>
  );
};
