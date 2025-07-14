import { Component, type ReactNode } from 'react';
import type { Character } from '../../types';
import { Card } from '../Card';
import './style.css';

interface CardListProps {
  items: Character[];
}

export class CardList extends Component<CardListProps> {
  render(): ReactNode {
    const { items } = this.props;

    if (!items || items.length === 0) {
      return <p>No characters found</p>;
    }
    return (
      <ul className="list">
        {items.map((item) => (
          <li className="list__item" key={item.id}>
            <Card item={item} />
          </li>
        ))}
      </ul>
    );
  }
}
