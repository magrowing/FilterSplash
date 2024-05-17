import { Link } from 'react-router-dom';

import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { auth, dbService } from '../../firebase/firebase';

import styled from 'styled-components';
import CommonButton from '../../styles/common/commonButton';

import { CardDTO } from '../../types/card';

import { useBookmarkStore } from '../../stores/useSettingBookmarkStore';

const CardItem = styled.li`
  position: relative;
  width: 100%;
  margin-bottom: 1rem;
  break-inside: avoid;
  &:hover {
    .overlay {
      opacity: 1;
    }
  }

  @media screen and (max-width: 1440px) {
    margin-bottom: 2rem;
  }
`;

const Img = styled.img`
  display: block;
  max-width: 100%;
  object-fit: cover;
`;

const OverlayBox = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 2rem;
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 0;
`;

const UserInfo = styled.dl`
  width: 100%;
  display: flex;
  align-items: center;

  dt {
    color: ${(props) => props.theme.colors.baseWhite};
    margin-left: 1rem;
  }

  dd {
    width: 4rem;
    height: 4rem;
    border-radius: 100%;
    overflow: hidden;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
`;

type CardProps = {
  data: CardDTO;
};

export default function Card({ data }: CardProps) {
  const user = auth.currentUser;
  const bookmarkData = useBookmarkStore((state) => state.bookmarkData);
  const { setBookmarkData } = useBookmarkStore((state) => state.actions);

  const handleBookmark = async () => {
    if (!user) return;
    if (bookmarkData.findIndex((item) => item.id === data.id) > -1) {
      alert('이미 북마크에 저장된 이미지입니다.');
      return;
    }

    try {
      const docRef = doc(dbService, 'collections', user.uid);
      await updateDoc(docRef, {
        bookmarkData: arrayUnion({
          id: data.id,
          authorName: data.user.name,
          describe: data.alt_description,
          image: data.urls.small,
        }),
      });
      setBookmarkData([
        {
          id: data.id,
          authorName: data.user.name,
          describe: data.alt_description,
          image: data.urls.small,
        },
        ...bookmarkData,
      ]);
      console.log(`${data.id} 북마크 성공`);
    } catch {
      console.log('FireBase Error');
    }
  };

  return (
    <CardItem>
      <Img src={data.urls.small} alt={data.alt_description} />
      <OverlayBox className="overlay">
        <ButtonBox>
          <CommonButton
            className={
              bookmarkData.filter((item) => item.id === data.id).length === 1
                ? `is_active`
                : ''
            }
            image={
              bookmarkData.filter((item) => item.id === data.id).length === 1
                ? '/images/icon_bookmark_active.svg'
                : '/images/icon_bookmark.svg'
            }
            onClick={handleBookmark}
          >
            북마크
          </CommonButton>
          <Link to={data.links.download} target="_blank">
            <CommonButton image={'/images/icon_download.svg'}>
              다운로드
            </CommonButton>
          </Link>
        </ButtonBox>
        <UserInfo>
          <dd>
            <Img
              src={data.user.profile_image.medium}
              alt={`${data.user.name}-이미지`}
            />
          </dd>
          <dt>{data.user.name}</dt>
        </UserInfo>
      </OverlayBox>
    </CardItem>
  );
}
