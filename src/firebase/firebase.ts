// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDktxTcShhRb4emhe0eObQMY73HTwIZuBo",
  authDomain: "filter-splash.firebaseapp.com",
  projectId: "filter-splash",
  storageBucket: "filter-splash.appspot.com",
  messagingSenderId: "1089882930854",
  appId: "1:1089882930854:web:5e32e5eeca8110eef4be67",
  measurementId: "G-13LZGQGETF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);