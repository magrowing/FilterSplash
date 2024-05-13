import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { auth, dbService } from '../firebase/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export default function Home() {
  const user = auth.currentUser;
  const [isCategory, setIsCategory] = useState(false);
  const [docID, setDocID] = useState('');

  const categorySettingChk = async () => {
    const categoryQuery = query(
      collection(dbService, 'users'),
      where('uid', '==', user?.uid)
    );

    const snapshot = await getDocs(categoryQuery);
    const usersData = snapshot.docs.map((doc) => {
      const { category } = doc.data();
      return {
        category,
        id: doc.id,
      };
    });
    if (!usersData[0].category.length) {
      setIsCategory(true);
      setDocID(usersData[0].id);
    }
  };

  useEffect(() => {
    categorySettingChk();
  }, []);

  if (isCategory) {
    return <Navigate to={`/category/${docID}`} />;
  }

  return <div>Home 화면 입니다.</div>;
}
