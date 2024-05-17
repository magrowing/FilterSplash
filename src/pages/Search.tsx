import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import CardList from '../components/card/CardList';

import { PageWrapper, PageContainer } from '../styles/common/pages';

const SearchWrapper = styled.div`
  position: relative;

  &::before {
    content: '';
    display: inherit;
    width: 100%;
    height: 2rem;
    margin-bottom: 2rem;
    background-color: ${(props) => props.theme.colors.baseGray};
  }
`;

const SearchTitle = styled.h3`
  margin-bottom: 4rem;
  font-size: ${(props) => props.theme.fonts.titleLarge};
  font-weight: ${(props) => props.theme.fonts.weightBold};
`;

export default function Search() {
  const params = useParams();

  return (
    <PageWrapper>
      <SearchWrapper>
        <PageContainer>
          <SearchTitle>{params.id}</SearchTitle>
          {/* List 영역 */}
          <CardList />
        </PageContainer>
      </SearchWrapper>
    </PageWrapper>
  );
}
