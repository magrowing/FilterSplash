import styled from 'styled-components';
import { CardDTO } from '../../types/card';

type CardProps = {
  data: CardDTO;
};

const CardItem = styled.li`
  width: 100%;
  margin-bottom: 1rem;
  break-inside: avoid;

  @media screen and (max-width: 1440px) {
    margin-bottom: 2rem;
  }
`;

const CardItemImg = styled.img`
  max-width: 100%;
`;

export default function Card({ data }: CardProps) {
  return (
    <CardItem>
      <CardItemImg src={data.urls.small} alt={data.alt_description} />
    </CardItem>
  );
}
