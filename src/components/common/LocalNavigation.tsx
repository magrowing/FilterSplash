/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';

import styled from 'styled-components';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

import { useUserInfoStore } from '../../stores/useUserInfoStore';
import { useUserImageStore } from '../../stores/useImageStore';

const Wrapper = styled.div`
  position: fixed;
  top: 6.6rem;
  left: 0%;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 2rem;
  gap: 2rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.third};
  background-color: ${(props) => props.theme.colors.baseWhite};

  .navSlider {
    margin: 0 auto;

    .swiper-slide {
      width: auto;
      margin: 0 1rem;
    }
  }
`;

const NavItem = styled.div`
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

  return (
    <Wrapper>
      <Swiper
        className="navSlider"
        slidesPerView={'auto'}
        freeMode={true}
        navigation={true}
        modules={[Navigation]}
      >
        {categories.map((item: string, index: number) => (
          <SwiperSlide key={`${item}-${index}`}>
            <NavItem>
              <NavLink to={`/${trimString(item)}`}>{item}</NavLink>
            </NavItem>
          </SwiperSlide>
        ))}
      </Swiper>
    </Wrapper>
  );
}
