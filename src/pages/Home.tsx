/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import styled from 'styled-components';
import { PageContainer, PageWrapper } from '../styles/common/pages';

import LocalNavigation from '../components/common/LocalNavigation';
import IntroSearchBar from '../components/home/IntroSearchBar';
import SettingCategories from '../components/setting-categories';
import BannerSlide from '../components/home/BannerSlider';
import CardList from '../components/card/CardList';

import { useUserInfoStore } from '../stores/useUserInfoStore';
import { useUserImageStore } from '../stores/useImageStore';
import { useSearchStore } from '../stores/useSearchStore';

const IntroWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
  margin: 4rem 0;
  gap: 4rem;
`;

export default function Home() {
  const category = useUserInfoStore((state) => state.category);
  const setHeaderSearch = useSearchStore((state) => state.setHeaderSearch);
  const setContentSearch = useSearchStore((state) => state.setContentSearch);
  const { setPage, setQuery } = useUserImageStore((state) => state.actions);
  const param = useParams();

  useEffect(() => {
    if (!param.id) {
      setQuery('random');
      setPage(1);
      setHeaderSearch('');
      setContentSearch('');
    }
  }, [param.id]);

  return (
    <PageWrapper>
      {category.length === 0 && <SettingCategories />}
      {/* Nav 영역 */}
      <LocalNavigation />
      <PageContainer>
        <IntroWrapper>
          {/* Intro 영역 */}
          <IntroSearchBar />
          <BannerSlide />
        </IntroWrapper>
        {/* List 영역 */}
        <CardList />
      </PageContainer>
    </PageWrapper>
  );
}
