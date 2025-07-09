import { Component, type ReactNode } from 'react';
import type { Character } from '../../types';
import { Card } from '../Card';

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
      <>
        {items.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </>
    );
  }
}
