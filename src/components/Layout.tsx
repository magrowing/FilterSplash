import { useEffect } from 'react';

import { Outlet } from 'react-router-dom';

import { auth, dbService } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

import Header from './common/Header';

import { useUserInfoStore } from '../stores/useUserInfoStore';

export default function Layout() {
  const user = auth.currentUser;
  const setCategory = useUserInfoStore((state) => state.setCategory);
  const setUser = useUserInfoStore((state) => state.setUser);

  const categorySettingChk = async () => {
    if (!user) return;

    const docRef = doc(dbService, 'users', user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // console.log(docSnap.data());
      const { category, email, image, name } = docSnap.data();
      setCategory(category);
      setUser({
        email,
        image,
        name,
      });
    }
  };

  useEffect(() => {
    categorySettingChk();
  }, []);

  return (
    <div className="container">
      <Header />
      <Outlet />
    </div>
  );
}
