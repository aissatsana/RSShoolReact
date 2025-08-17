import { type FC } from 'react';
import type { Character } from '../../types';
import styles from './Card.module.css';
import { useTranslations } from 'next-intl';

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
}) => {
  const t = useTranslations('Card');
  return (
    <div className={styles.item} id={item.id.toString()}>
      <input
        className={styles.item__select}
        type="checkbox"
        checked={isSelected}
        onChange={() => onToggleSelect(item.id)}
      />
      <h3 className={styles.item__name}>{item.name}</h3>
      <img className={styles.item__img} src={item.image} alt={item.name}></img>
      <button
        className={styles.item__button}
        type="button"
        onClick={() => onClickButton(item.id)}
      >
        {t('View info')}
      </button>
    </div>
  );
};
