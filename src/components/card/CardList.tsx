import styled from 'styled-components';

import Card from './Card';

import useImageDate from '../../hooks/useImageDate';

import { CardDTO } from '../../types/card';

const CardListWrapper = styled.ul`
  width: 100%;
  columns: 4;
  column-gap: 2rem;

  @media screen and (max-width: 1440px) {
    columns: 3;
  }
`;

export default function CardList() {
  const cardData = useImageDate();

  return (
    <CardListWrapper>
      {cardData.results.map((card: CardDTO) => (
        <Card key={card.id} data={card} />
      ))}
    </CardListWrapper>
  );
}
