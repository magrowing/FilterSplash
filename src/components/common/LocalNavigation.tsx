import { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';

import styled from 'styled-components';

import { useUserInfoStore } from '../../stores/useUserInfoStore';
import { useUserImageStore } from '../../stores/useImageStore';

const Wrapper = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
  gap: 2rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.third};
`;

const NavItem = styled.li`
  a {
    display: block;
    width: 100%;
    color: ${(props) => props.theme.colors.secondary};
    font-size: ${(props) => props.theme.fonts.bodySmall};
    padding: 1rem 0;

    &:hover {
      color: ${(props) => props.theme.colors.primary};
      cursor: pointer;
      font-weight: ${(props) => props.theme.fonts.weightMedium};
    }

    &.active {
      border-bottom: 2px solid ${(props) => props.theme.colors.primary};
      color: ${(props) => props.theme.colors.primary};
      font-weight: ${(props) => props.theme.fonts.weightMedium};
    }
  }
`;

/**
 * TODO : 분리 예정
 * Link 공백 없애는 유틸 함수
 */
const trimString = (str: string) => {
  return str.replaceAll(' ', '');
};

export default function LocalNavigation() {
  const categories = useUserInfoStore((state) => state.category);
  const { setPage, setQuery } = useUserImageStore((state) => state.actions);
  const param = useParams();

  useEffect(() => {
    categories.forEach((nav: string) => {
      if (nav.includes(param.id ?? 'random')) {
        setQuery(nav);
        setPage(1);
      }
    });
  }, [param.id]);

  const navLink = categories.map((item: string, index: number) => (
    <NavItem key={`${item}-${index}`}>
      <NavLink to={`/${trimString(item)}`}>{item}</NavLink>
    </NavItem>
  ));

  return <Wrapper>{navLink}</Wrapper>;
}
