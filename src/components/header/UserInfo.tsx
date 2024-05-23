import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import { auth } from '../../firebase/firebase';

import { useUserInfoStore } from '../../stores/useUserInfoStore';

const UserWrapper = styled.div`
  position: relative;
`;

const User = styled.button`
  width: 3.2rem;
  height: 3.2rem;
  padding: 0;
  border-radius: 100%;
  border: 1px solid ${(props) => props.theme.colors.third};
  overflow: hidden;

  img {
    width: 100%;
  }
`;

const UserLinks = styled.ul`
  position: absolute;
  top: 4rem;
  right: 0;
  z-index: 10;
  min-width: 12rem;
  background-color: ${(props) => props.theme.colors.baseWhite};
  border: 1px solid ${(props) => props.theme.colors.third};
  border-radius: ${(props) => props.theme.shape.small};
  overflow: hidden;
`;

const UserLinkItem = styled.li`
  font-size: ${(props) => props.theme.fonts.bodySmall};
  color: ${(props) => props.theme.colors.secondary};

  &:last-of-type {
    border-top: 1px solid ${(props) => props.theme.colors.third};
  }

  &:hover {
    background-color: #eee;
    color: ${(props) => props.theme.colors.primary};
  }

  a {
    display: block;
    width: 100%;
    color: inherit;
    padding: 0.8rem 1rem;
  }

  button {
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    font-size: inherit;
    color: inherit;
    padding: 0.8rem 1rem;

    svg {
      width: 1.6rem;
      height: 1.6rem;
      margin-right: 0.6rem;
    }
  }
`;

export default function UserInfo() {
  const user = useUserInfoStore((state) => state.user);
  const [isShow, setIsShow] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const isLogoutConfirm = confirm('정말로 로그아웃을 하시겠습니까?');
    if (isLogoutConfirm) {
      await auth.signOut();
      navigate('/login', { replace: true });
    }
  };

  const handleToggleBtn = () => {
    setIsShow(!isShow);
  };

  return (
    <UserWrapper>
      <User type="button" onClick={handleToggleBtn}>
        <img src={user.image} alt="프로필 이미지" />
      </User>
      {isShow && (
        <UserLinks>
          <UserLinkItem>
            <Link to="/profile">프로필 보기</Link>
          </UserLinkItem>
          <UserLinkItem>
            <Link to="/account">계정 설정</Link>
          </UserLinkItem>
          <UserLinkItem>
            <button type="button" onClick={handleLogout}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M19 10a.75.75 0 0 0-.75-.75H8.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 19 10Z"
                  clipRule="evenodd"
                />
              </svg>
              로그아웃
            </button>
          </UserLinkItem>
        </UserLinks>
      )}
    </UserWrapper>
  );
}
