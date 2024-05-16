import LocalNavigation from '../components/common/LocalNavigation';
import IntroSearchBar from '../components/home/IntroSearchBar';
import SettingCategories from '../components/setting-categories';

import { PageContainer, PageWrapper } from '../styles/common/pages';

import { useUserInfoStore } from '../stores/useUserInfoStore';

export default function Home() {
  const category = useUserInfoStore((state) => state.category);

  return (
    <PageWrapper>
      {category.length === 0 && <SettingCategories />}
      {/* Nav 영역 */}
      <LocalNavigation />
      <PageContainer>
        {/* Intro 영역 */}
        <IntroSearchBar />
        {/* List 영역 */}
      </PageContainer>
    </PageWrapper>
  );
}
