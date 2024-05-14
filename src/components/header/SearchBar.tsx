import styled from 'styled-components';

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  border-radius: 4rem;
  background-color: ${(props) => props.theme.colors.baseWhite};
  border: 1px solid ${(props) => props.theme.colors.third};
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 1rem;
  font-size: ${(props) => props.theme.fonts.bodySmall};
`;

const SearchButton = styled.button`
  font-size: 0;
  padding: 0.6rem;
  svg {
    width: 2rem;
    height: 2rem;
    stroke: ${(props) => props.theme.colors.secondary};
  }

  &:hover {
    svg {
      stroke: ${(props) => props.theme.colors.primary};
    }
  }
`;

export default function SearchBar() {
  return (
    <Wrapper>
      <SearchInput type="text" placeholder="고해상도 이미지 검색" />
      <SearchButton type="button">
        검색 버튼
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </SearchButton>
    </Wrapper>
  );
}
