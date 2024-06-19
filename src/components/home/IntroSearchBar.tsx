import styled from 'styled-components';

import SearchBar from '../header/SearchBar';

import { useSearchStore } from '../../stores/useSearchStore';

const Wrapper = styled.section`
  width: 55%;
`;

const IntroTextWrapper = styled.dl`
  width: 100%;
  margin-bottom: ${(props) => props.theme.spacing.spacing3};

  dd {
    font-size: ${(props) => props.theme.fonts.bodyLarge};
  }
  h2 {
    font-size: ${(props) => props.theme.fonts.headingMedium};
    font-weight: ${(props) => props.theme.fonts.weightBold};
  }
`;

export default function IntroSearchBar() {
  const contentSearch = useSearchStore((state) => state.contentSearch);
  const setContentSearch = useSearchStore((state) => state.setContentSearch);
  return (
    <Wrapper>
      <IntroTextWrapper>
        <dt>
          <h2>FilterSplash</h2>
        </dt>
        <dd>인터넷의 시작 자료 출처입니다.</dd>
        <dd>모든 지역에 있는 크리에이터들의 지원을 받습니다.</dd>
      </IntroTextWrapper>
      <SearchBar
        type="square"
        search={contentSearch}
        setSearch={setContentSearch}
      />
    </Wrapper>
  );
}
