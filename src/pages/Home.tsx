import { useUserInfoStore } from '../stores/useUserInfoStore';

import Category from './Category';

export default function Home() {
  const category = useUserInfoStore((state) => state.category);

  if (category.length === 0) {
    return <Category />;
  }

  return <div>홈페이지입니다.</div>;
}
