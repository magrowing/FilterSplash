import { styled } from 'styled-components';
import { PageWrapper, PageContainer } from '../styles/common/pages';

import UserProfileUpdate from '../components/account/UserProfileUpdate';
import UserCategoryUpdate from '../components/account/UserCategoryUpdate';

const AccountContainer = styled(PageContainer)`
  max-width: 60%;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h3`
  font-size: ${(props) => props.theme.fonts.bodyLarge};
  font-weight: ${(props) => props.theme.fonts.weightBold};
`;

const SubTitle = styled.p`
  color: ${(props) => props.theme.colors.secondary};
  font-size: ${(props) => props.theme.fonts.bodySmall};
  margin-left: 1rem;
`;

const UserInfoUpdate = styled.div`
  margin-bottom: 4rem;
`;

export default function Account() {
  return (
    <PageWrapper>
      <AccountContainer>
        <UserInfoUpdate>
          <TitleBox>
            <Title>프로필 설정</Title>
          </TitleBox>
          <UserProfileUpdate />
        </UserInfoUpdate>
        <UserInfoUpdate>
          <TitleBox>
            <Title>카테고리 설정</Title>
            <SubTitle>최대 20개까지 설정 가능합니다.</SubTitle>
          </TitleBox>
          <UserCategoryUpdate />
        </UserInfoUpdate>
      </AccountContainer>
    </PageWrapper>
  );
}
