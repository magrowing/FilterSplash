import UserProfile from '../components/profile/UserProfile';
import TabList from '../components/profile/TabList';
import CollectionsList from '../components/collection/CollectionsList';

import { PageContainer, PageWrapper } from '../styles/common/pages';

export default function Profile() {
  return (
    <PageWrapper>
      <PageContainer>
        <UserProfile />
        <TabList />
        <CollectionsList />
      </PageContainer>
    </PageWrapper>
  );
}
