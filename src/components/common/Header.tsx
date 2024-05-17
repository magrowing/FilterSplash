import { Link } from 'react-router-dom';

import styled from 'styled-components';

import SearchBar from '../header/SearchBar';
import UserInfo from '../header/UserInfo';

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  width: 100%;
  padding: ${(props) => props.theme.spacing.spacing1}
    ${(props) => props.theme.spacing.spacing3};
  gap: ${(props) => props.theme.spacing.spacing3};
  background-color: ${(props) => props.theme.colors.baseWhite};
`;

const Logo = styled.h1`
  width: 3.6rem;
  height: 3.6rem;
  overflow: hidden;

  a {
    display: block;
    width: 100%;
  }

  img {
    width: 100%;
  }
`;

const AdLinkWrapper = styled.nav`
  a {
    margin-left: 1.6rem;
    font-size: ${(props) => props.theme.fonts.bodySmall};
    color: ${(props) => props.theme.colors.secondary};
    font-weight: ${(props) => props.theme.fonts.weightMedium};

    &:last-of-type {
      color: ${(props) => props.theme.colors.primary};
    }
  }
`;

const BtnLinkWrapper = styled.nav`
  display: flex;
  align-items: center;
  margin-left: auto;

  a {
    display: inline-flex;
    align-items: center;
    height: 3.2rem;
    line-height: 3rem;
    padding: 0 1rem;
    margin-left: 1rem;
    font-size: ${(props) => props.theme.fonts.bodySmall};
    color: ${(props) => props.theme.colors.secondary};
    background: ${(props) => props.theme.colors.btnPrimaryBg};
    border: 1px solid ${(props) => props.theme.colors.third};
    border-radius: ${(props) => props.theme.shape.small};

    svg {
      width: 1.6rem;
      height: 1.6rem;
      margin-right: 0.6rem;
    }

    &:hover {
      border-color: ${(props) => props.theme.colors.primary};
      color: ${(props) => props.theme.colors.primary};
    }
  }
`;

export default function Header() {
  return (
    <HeaderWrapper>
      {/* 로고 영역 */}
      <Logo>
        <Link to={'/'}>
          <img src={'/images/logo.svg'} alt="logo" />
        </Link>
      </Logo>
      {/* searchBar 영역 */}
      <SearchBar />
      {/* navLink 영역 */}
      <AdLinkWrapper>
        <Link to="https://unsplash.com/ko/%EA%B4%91%EA%B3%A0" target="_blank">
          광고
        </Link>
        <Link to="https://unsplash.com/blog/" target="_blank">
          블로그
        </Link>
        <Link
          to="https://unsplash.com/ko/%ED%94%8C%EB%9F%AC%EC%8A%A4/"
          target="_blank"
        >
          Unsplash+
        </Link>
      </AdLinkWrapper>
      <BtnLinkWrapper>
        <Link to="https://unsplash.com/ko/" target="_blank">
          Unsplash
        </Link>
        <Link to={'/collection'} className="collection">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M10 2c-1.716 0-3.408.106-5.07.31C3.806 2.45 3 3.414 3 4.517V17.25a.75.75 0 0 0 1.075.676L10 15.082l5.925 2.844A.75.75 0 0 0 17 17.25V4.517c0-1.103-.806-2.068-1.93-2.207A41.403 41.403 0 0 0 10 2Z"
              clipRule="evenodd"
            />
          </svg>
          collection
        </Link>
      </BtnLinkWrapper>
      {/* 유저정보 영역 */}
      <UserInfo />
    </HeaderWrapper>
  );
}
