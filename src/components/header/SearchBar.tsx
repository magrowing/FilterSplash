import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import styled, { css } from 'styled-components';

import { useUserImageStore } from '../../stores/useImageStore';

type styledProps = {
  shape?: string;
};

const Wrapper = styled.div<styledProps>`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  border-radius: 4rem;
  background-color: ${(props) => props.theme.colors.baseWhite};
  border: 1px solid ${(props) => props.theme.colors.third};

  ${(props) =>
    props.shape &&
    css`
      border-radius: 0.8rem;
    `}
`;

const SearchInput = styled.input<styledProps>`
  flex: 1;
  padding: 1rem;
  font-size: ${(props) => props.theme.fonts.bodySmall};

  ${(props) =>
    props.shape &&
    css`
      padding: 1.2rem;
    `}
`;

const SearchDeleteButton = styled.button`
  position: relative;
  font-size: 0;
  padding: 1rem;
  svg {
    width: 2rem;
    height: 2rem;
    fill: ${(props) => props.theme.colors.secondary};
  }

  &::after {
    display: inherit;
    content: '';
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: 1px;
    height: 1.6rem;
    background-color: ${(props) => props.theme.colors.third};
  }
`;

const SearchButton = styled.button<styledProps>`
  font-size: 0;
  padding: 0.6rem;
  svg {
    width: 2rem;
    height: 2rem;
    fill: ${(props) => props.theme.colors.secondary};
  }

  &:hover {
    svg {
      fill: ${(props) => props.theme.colors.primary};
    }
  }

  ${(props) =>
    props.type &&
    css`
      padding: 1rem;
    `}
`;

export default function SearchBar({ type }: { type: string }) {
  const [search, setSearch] = useState('');
  const { setPage, setQuery } = useUserImageStore((state) => state.actions);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigation = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  const onDelete = () => {
    inputRef.current?.focus();
    setSearch('');
  };

  const onSubmit = () => {
    setQuery(search);
    setPage(1);
    navigation(`/search/${search}`);
  };

  return (
    <Wrapper shape={type}>
      <SearchInput
        type="text"
        placeholder="고해상도 이미지 검색"
        shape={type}
        ref={inputRef}
        value={search}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {search && (
        <SearchDeleteButton type="button" onClick={onDelete}>
          삭제 버튼
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
          </svg>
        </SearchDeleteButton>
      )}
      <SearchButton type="button" shape={type} onClick={onSubmit}>
        검색 버튼
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
            clipRule="evenodd"
          />
        </svg>
      </SearchButton>
    </Wrapper>
  );
}
