import { auth, dbService } from './firebase';
import { addDoc, collection } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';

import dummyUserImage from '../assets/images/dummy_user.png';

export const createUser =  async(email : string, password : string, name :string) => {
  const credentials =  await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  await updateProfile(credentials.user, { displayName: name });
  await addDoc(collection(dbService, 'users'), {
    uid: credentials.user.uid,
    name : credentials.user.displayName,
    email : credentials.user.email,
    image : dummyUserImage
  });
}

export const singUp = async(email : string, password : string,) => {
  await signInWithEmailAndPassword(auth, email, password);
}