import { auth, dbService } from './firebase';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';

import dummyUserImage from '../assets/images/dummy_user.png';

export const createUser =  async(email : string, password : string, name :string) => {
  const credentials =  await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  await updateProfile(credentials.user, { displayName: name });
  await setDoc(doc(dbService, 'users', credentials.user.uid), {
    uid : credentials.user.uid,
    name : credentials.user.displayName,
    email : credentials.user.email,
    image : dummyUserImage, 
    category : [],
  });
}

export const singUp = async(email : string, password : string,) => {
  await signInWithEmailAndPassword(auth, email, password);
}

export const resetPassword = async(email : string) => {
  await sendPasswordResetEmail(auth, email);
}


