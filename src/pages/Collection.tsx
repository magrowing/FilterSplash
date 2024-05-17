import CollectionsList from '../components/collection/CollectionsList';
import { PageContainer, PageWrapper } from '../styles/common/pages';

export default function Collection() {
  return (
    <PageWrapper>
      <PageContainer>
        <CollectionsList />
      </PageContainer>
    </PageWrapper>
  );
}
