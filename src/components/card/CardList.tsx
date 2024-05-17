import { useEffect } from 'react';

import { auth, dbService } from '../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

import Card from './Card';
import { CardListWrapper } from '../../styles/common/list';

import useImageDate from '../../hooks/useImageDate';

import { useBookmarkStore } from '../../stores/useSettingBookmarkStore';

import { CardDTO } from '../../types/card';

export default function CardList() {
  const user = auth.currentUser;
  const cardData = useImageDate();
  const { setBookmarkData } = useBookmarkStore((state) => state.actions);

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

  useEffect(() => {
    userSettingChk();
  }, []);

  return (
    <CardListWrapper>
      {cardData.results.map((card: CardDTO) => (
        <Card key={card.id} data={card} />
      ))}
    </CardListWrapper>
  );
}
