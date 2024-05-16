import styled from 'styled-components';

import LocalNavigation from '../components/common/LocalNavigation';
import IntroSearchBar from '../components/home/IntroSearchBar';
import SettingCategories from '../components/setting-categories';
import BannerSlide from '../components/home/BannerSlider';

import { PageContainer, PageWrapper } from '../styles/common/pages';

import { useUserInfoStore } from '../stores/useUserInfoStore';

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
      </PageContainer>
    </PageWrapper>
  );
}
