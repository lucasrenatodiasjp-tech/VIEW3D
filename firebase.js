import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBl7Bmn0LPm1FYsXlYTb64cpPlBd-2ZVG0",
  authDomain: "teste-a6867.firebaseapp.com",
  projectId: "teste-a6867",
  storageBucket: "teste-a6867.firebasestorage.app",
  messagingSenderId: "906041379881",
  appId: "1:906041379881:web:1f152c30485bf9c1782038",
  measurementId: "G-CVERGXV4L9"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
