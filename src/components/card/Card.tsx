import { Link } from 'react-router-dom';

import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { auth, dbService } from '../../firebase/firebase';

import {
  CardItem,
  Img,
  OverlayBox,
  ButtonBox,
  UserInfo,
} from '../../styles/common/list';
import CommonButton from '../../styles/common/commonButton';

import { useBookmarkStore } from '../../stores/useSettingBookmarkStore';

import { CardDTO } from '../../types/card';

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

    const updateDate = {
      id: data.id,
      image: data.urls.small,
      authorName: data.user.name,
      authorImage: data.user.profile_image.medium,
      describe: data.alt_description,
      download: data.links.download,
    };

    try {
      const docRef = doc(dbService, 'collections', user.uid);
      await updateDoc(docRef, {
        bookmarkData: arrayUnion(updateDate),
      });
      setBookmarkData([
        {
          ...updateDate,
        },
        ...bookmarkData,
      ]);
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
