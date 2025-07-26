import { type FC } from 'react';
import type { Character } from '../../types';
import './style.css';

interface CardProps {
  item: Character;
}

export const Card: FC<CardProps> = ({ item }) => (
  <div className="item" id={item.id.toString()}>
    <h3 className="item__name">{item.name}</h3>
    <span className="item__gender">{item.gender}</span>
    <img className="item__img" src={item.image} alt={item.name}></img>
  </div>
);
