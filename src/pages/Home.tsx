import LocalNavigation from '../components/common/LocalNavigation';
import { useUserInfoStore } from '../stores/useUserInfoStore';

import { PageWrapper } from '../styles/common/pages';

import Category from './Category';

export default function Home() {
  const category = useUserInfoStore((state) => state.category);

  return (
    <PageWrapper>
      {category.length === 0 && <Category />}
      {/* Nav 영역 */}
      <LocalNavigation />
    </PageWrapper>
  );
}
