import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import CardList from '../components/card/CardList';

import { PageWrapper, PageContainer } from '../styles/common/pages';

const SearchTitle = styled.h3`
  margin-bottom: 4rem;
  font-size: ${(props) => props.theme.fonts.titleLarge};
  font-weight: ${(props) => props.theme.fonts.weightBold};
`;

export default function Search() {
  const params = useParams();

  return (
    <PageWrapper>
      <PageContainer>
        <SearchTitle>{params.id}</SearchTitle>
        {/* List 영역 */}
        <CardList />
      </PageContainer>
    </PageWrapper>
  );
}
