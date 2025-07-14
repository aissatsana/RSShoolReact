import { Component, type ReactNode } from 'react';
import type { Character } from '../../types';
import './style.css';

interface CardProps {
  item: Character;
}

export class Card extends Component<CardProps> {
  render(): ReactNode {
    const { item } = this.props;
    return (
      <>
        <div className="item" id={item.id.toString()}>
          <h3 className="item__name">{item.name}</h3>
          <img className="item__img" src={item.image} alt={item.name}></img>
        </div>
      </>
    );
  }
}
