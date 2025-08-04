import { type FC } from 'react';
import type { Character } from '../../types';
import './style.css';

interface CardProps {
  item: Character;
  onClickButton: (id: number) => void;
  isSelected: boolean;
  onToggleSelect: (id: number) => void;
}

export const Card: FC<CardProps> = ({
  item,
  onClickButton,
  isSelected,
  onToggleSelect,
}) => (
  <div className="item" id={item.id.toString()}>
    <input
      className="item__select"
      type="checkbox"
      checked={isSelected}
      onChange={() => onToggleSelect(item.id)}
    />
    <h3 className="item__name">{item.name}</h3>
    <img className="item__img" src={item.image} alt={item.name}></img>
    <button
      className="item__button"
      type="button"
      onClick={() => onClickButton(item.id)}
    >
      View info
    </button>
  </div>
);
