import { Link } from 'react-router-dom';

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
  handleDetailDialog: (data: CardDTO) => void;
  handleAddBookmark: (data: CardDTO) => void;
};

export default function Card({
  data,
  handleDetailDialog,
  handleAddBookmark,
}: CardProps) {
  const bookmarkData = useBookmarkStore((state) => state.bookmarkData);

  return (
    <CardItem>
      <Img src={data.urls.small} alt={data.alt_description} />
      <OverlayBox onClick={() => handleDetailDialog(data)} />
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
          onClick={() => handleAddBookmark(data)}
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
    </CardItem>
  );
}
