/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';

import { auth, dbService } from '../../firebase/firebase';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';

import Card from './Card';
import Spinner from '../ui/Spinner';
import DetailDialog from '../common/DetailDialog';
import TopButton from '../common/TopButton';
import { CardListWrapper } from '../../styles/common/list';

import useImageDate from '../../hooks/useImageDate';

import { useBookmarkStore } from '../../stores/useSettingBookmarkStore';
import { useUserImageStore } from '../../stores/useImageStore';

import { CardDTO, initialCardDTO } from '../../types/card';
import NoneScreen from '../NoneScreen';

export default function CardList() {
  const [isOpen, setOpen] = useState(false);
  const [detailData, setDetailData] = useState<CardDTO>(initialCardDTO);

  const target = useRef<HTMLDivElement | null>(null);

  const user = auth.currentUser;

  const { imageDate, hasMore } = useImageDate();

  const bookmarkData = useBookmarkStore((state) => state.bookmarkData);
  const { setBookmarkData } = useBookmarkStore((state) => state.actions);
  const { setScrollPage } = useUserImageStore((state) => state.actions);

  /**
   * firebase로 부터 bookmark 데이터 가져오기
   */
  const userSettingChk = async () => {
    if (!user) return;

    const docCollectionsRef = doc(dbService, 'collections', user.uid);
    const docCollectionsSnap = await getDoc(docCollectionsRef);
    if (docCollectionsSnap.exists()) {
      //console.log(docCollectionsSnap.data());
      const { bookmarkData } = docCollectionsSnap.data();
      setBookmarkData(bookmarkData);
    }
  };

  /**
   * card 아이템 클릭시 Dialog 보여주고, 개별 데이터 전달하는 함수
   */
  const handleDetailDialog = (data: CardDTO) => {
    setOpen(true);
    setDetailData(data);
  };

  /**
   * Dialog 닫는 함수
   */
  const handleClose = () => {
    setOpen(false);
  };

  /**
   * Bookmark 추가하는 함수
   */
  const handleAddBookmark = async (data: CardDTO) => {
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

  useEffect(() => {
    window.scroll(0, 0);
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setScrollPage();
      }
    });

    userSettingChk();
    if (!target.current) return;
    observer.observe(target.current);

    return () => {
      if (target.current) observer.unobserve(target.current);
    };
  }, [target.current]);

  return !imageDate.length ? (
    <NoneScreen>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-6"
      >
        <path
          fillRule="evenodd"
          d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
          clipRule="evenodd"
        />
      </svg>

      <dl>
        <dt>이미지가 존재하지않아요!</dt>
        <dd>해당 관심사는 제외하고 다시 찾아주세요!</dd>
      </dl>
    </NoneScreen>
  ) : (
    <>
      <CardListWrapper>
        {imageDate.map((card: CardDTO) => (
          <Card
            key={card.id}
            data={card}
            handleDetailDialog={handleDetailDialog}
            handleAddBookmark={handleAddBookmark}
          />
        ))}
      </CardListWrapper>
      {hasMore && (
        <div ref={target}>
          <Spinner />
        </div>
      )}
      {isOpen && (
        <DetailDialog
          data={detailData}
          handleClose={handleClose}
          handleAddBookmark={handleAddBookmark}
        />
      )}
      <TopButton />
    </>
  );
}
