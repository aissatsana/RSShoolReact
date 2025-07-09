import { Component, type ReactNode } from 'react';
import type { Character } from '../../types';

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
          <span className="item__status">{item.status}</span>
          <span className="item__species">{item.species}</span>
          <span className="item__gender">{item.gender}</span>
          <img className="item__img" src={item.image} alt={item.name}></img>
        </div>
      </>
    );
  }
}
