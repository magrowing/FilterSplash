import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import { useUserInfoStore } from '../../stores/useUserInfoStore';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 80%;
  margin: 0 auto;
  gap: 4rem;
`;

const ImageBox = styled.figure`
  width: 15rem;
  height: 15rem;
  border: 1px solid ${(props) => props.theme.colors.third};
  border-radius: 100%;
  overflow: hidden;

  img {
    display: block;
    max-width: 100%;
    object-fit: cover;
  }
`;

const InfoBox = styled.div`
  flex: 1;
  dl {
    dt {
      margin-bottom: 1rem;
      span {
        font-size: ${(props) => props.theme.fonts.titleLarge};
        font-weight: ${(props) => props.theme.fonts.weightBold};
        margin-right: 1rem;
      }
    }

    dd {
      font-size: ${(props) => props.theme.fonts.bodySmall};
      color: ${(props) => props.theme.colors.secondary};
      margin-bottom: 2rem;
    }
  }
`;

const ProfileButton = styled.button`
  display: inline-flex;
  align-items: center;
  height: 3.2rem;
  line-height: 3rem;
  padding: 0 1rem;
  margin-left: 1rem;
  font-size: ${(props) => props.theme.fonts.bodySmall};
  color: ${(props) => props.theme.colors.secondary};
  background: ${(props) => props.theme.colors.btnPrimaryBg};
  border: 1px solid ${(props) => props.theme.colors.third};
  border-radius: ${(props) => props.theme.shape.small};

  svg {
    width: 1.6rem;
    height: 1.6rem;
    margin-right: 0.6rem;
  }

  &:hover {
    border-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.primary};
  }
`;

const TagBox = styled.div`
  margin-bottom: 6rem;
`;

const TagList = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 2rem;
`;

const TagItem = styled.li`
  padding: ${(props) => props.theme.shape.small};
  margin-right: ${(props) => props.theme.shape.small};
  margin-bottom: 0.6rem;
  color: ${(props) => props.theme.colors.secondary};
  background-color: ${(props) => props.theme.colors.baseGray};
  font-size: ${(props) => props.theme.fonts.bodySmall};
  border-radius: ${(props) => props.theme.shape.small};
`;

export default function UserProfile() {
  const user = useUserInfoStore((state) => state.user);
  const category = useUserInfoStore((state) => state.category);
  const navigation = useNavigate();

  const handleProfileEdit = () => {
    navigation('/account');
  };

  return (
    <Wrapper>
      <ImageBox>
        <img src={user.image} alt={user.name} />
      </ImageBox>
      <InfoBox>
        <dl>
          <dt>
            <span>{user.name}</span>
            <ProfileButton type="button" onClick={handleProfileEdit}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M11.013 2.513a1.75 1.75 0 0 1 2.475 2.474L6.226 12.25a2.751 2.751 0 0 1-.892.596l-2.047.848a.75.75 0 0 1-.98-.98l.848-2.047a2.75 2.75 0 0 1 .596-.892l7.262-7.261Z"
                  clipRule="evenodd"
                />
              </svg>
              프로필 편집
            </ProfileButton>
          </dt>
          <dd>
            <span>{user.name}</span>(이)가 큐레이팅한 무료의 아름다운 고화질
            사진을 다운로드하세요.
          </dd>
        </dl>
        <TagBox>
          <p>관심사</p>
          <TagList>
            {category.map((item) => (
              <TagItem key={`${user.name}-${item}`}>{item}</TagItem>
            ))}
          </TagList>
        </TagBox>
      </InfoBox>
    </Wrapper>
  );
}
