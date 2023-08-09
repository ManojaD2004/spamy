// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCs-77Ro0N80LhC-DmpcvwmBQNlOfttUXA",
  authDomain: "insta-2-build.firebaseapp.com",
  projectId: "insta-2-build",
  storageBucket: "insta-2-build.appspot.com",
  messagingSenderId: "323802779481",
  appId: "1:323802779481:web:946fe4935d32d6816cc648"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };