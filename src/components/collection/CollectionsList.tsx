import { useEffect, useState } from 'react';

import { auth, dbService } from '../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

import LoadingScreen from '../LoadingScreen';
import CollectionCard from './CollectionCard';

import { CardListWrapper } from '../../styles/common/list';

import { useBookmarkStore } from '../../stores/useSettingBookmarkStore';

export default function CollectionsList() {
  const user = auth.currentUser;
  const [isLoading, setLoading] = useState(true);
  const bookmarkData = useBookmarkStore((state) => state.bookmarkData);
  const { setBookmarkData } = useBookmarkStore((state) => state.actions);

  const userSettingChk = async () => {
    if (!user) return;

    try {
      const docCollectionsRef = doc(dbService, 'collections', user.uid);
      const docCollectionsSnap = await getDoc(docCollectionsRef);
      if (docCollectionsSnap.exists()) {
        console.log(docCollectionsSnap.data());
        const { bookmarkData } = docCollectionsSnap.data();
        setBookmarkData(bookmarkData);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(!isLoading);
    }
  };

  useEffect(() => {
    userSettingChk();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <CardListWrapper>
      {bookmarkData.map((collection) => (
        <CollectionCard key={collection.id} data={collection} />
      ))}
    </CardListWrapper>
  );
}
