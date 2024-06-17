import { useEffect, useState } from 'react';

import { auth, dbService } from '../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

import LoadingScreen from '../LoadingScreen';
import CollectionCard from './CollectionCard';

import { CardListWrapper } from '../../styles/common/list';

import { useBookmarkStore } from '../../stores/useSettingBookmarkStore';
import NoneScreen from '../NoneScreen';

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
        //console.log(docCollectionsSnap.data());
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

  return bookmarkData.length ? (
    <CardListWrapper>
      {bookmarkData.map((collection) => (
        <CollectionCard key={collection.id} data={collection} />
      ))}
    </CardListWrapper>
  ) : (
    <NoneScreen style="full-height">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-6"
      >
        <path d="M19.5 21a3 3 0 0 0 3-3v-4.5a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h15ZM1.5 10.146V6a3 3 0 0 1 3-3h5.379a2.25 2.25 0 0 1 1.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 0 1 3 3v1.146A4.483 4.483 0 0 0 19.5 9h-15a4.483 4.483 0 0 0-3 1.146Z" />
      </svg>
      <dl>
        <dt>아직 추가된 Collection 없어요!</dt>
        <dd>관심사별로 Collection 추가 하실 수 있어요.</dd>
      </dl>
    </NoneScreen>
  );
}
