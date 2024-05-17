import { useEffect, useState } from 'react';

import { auth, dbService } from '../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

import LoadingScreen from '../LoadingScreen';
import { BookmarkData } from '../../types/card';

export default function CollectionsList() {
  const user = auth.currentUser;
  const [isLoading, setLoading] = useState(true);
  const [collections, setCollection] = useState<BookmarkData[]>([]);

  const userSettingChk = async () => {
    if (!user) return;

    try {
      const docCollectionsRef = doc(dbService, 'collections', user.uid);
      const docCollectionsSnap = await getDoc(docCollectionsRef);
      if (docCollectionsSnap.exists()) {
        console.log(docCollectionsSnap.data());
        const { bookmarkData } = docCollectionsSnap.data();
        setCollection(bookmarkData);
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
    <div>
      {collections.map((collection) => (
        <p key={collection.id}>{collection.authorName}</p>
      ))}
    </div>
  );
}
