import { Link } from 'react-router-dom';

import { arrayRemove, doc, updateDoc } from 'firebase/firestore';
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

import { BookmarkData } from '../../types/card';

type CardProps = {
  data: BookmarkData;
};

export default function CollectionCard({ data }: CardProps) {
  const user = auth.currentUser;
  const bookmarkData = useBookmarkStore((state) => state.bookmarkData);
  const { setBookmarkData } = useBookmarkStore((state) => state.actions);

  const handleBookmark = async () => {
    if (!user) return;

    const deleteData = {
      id: data.id,
      image: data.image,
      authorName: data.authorName,
      authorImage: data.authorImage,
      describe: data.describe,
      download: data.download,
    };

    try {
      const docRef = doc(dbService, 'collections', user.uid);
      await updateDoc(docRef, {
        bookmarkData: arrayRemove(deleteData),
      });
      setBookmarkData(bookmarkData.filter((item) => item.id !== data.id));
    } catch {
      console.log('FireBase Error');
    }
  };

  return (
    <CardItem>
      <Img src={data.image} alt={data.describe} />
      <OverlayBox className="overlay">
        <ButtonBox>
          <CommonButton
            className={'is_delete'}
            image={'/images/icon_bookmark_delete.svg'}
            onClick={handleBookmark}
          >
            북마크
          </CommonButton>
          <Link to={data.download} target="_blank">
            <CommonButton image={'/images/icon_download.svg'}>
              다운로드
            </CommonButton>
          </Link>
        </ButtonBox>
        <UserInfo>
          <dd>
            <Img src={data.authorImage} alt={`${data.authorName}-이미지`} />
          </dd>
          <dt>{data.authorName}</dt>
        </UserInfo>
      </OverlayBox>
    </CardItem>
  );
}
