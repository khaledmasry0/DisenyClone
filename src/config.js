import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBLGVOZuXJTpEJHNx7nh-U4ANlYvx1iGO0",
  authDomain: "disenyclone-62e0f.firebaseapp.com",
  projectId: "disenyclone-62e0f",
  storageBucket: "disenyclone-62e0f.appspot.com",
  messagingSenderId: "1047815576210",
  appId: "1:1047815576210:web:a65e4ee45142e01b6ba44b",
  measurementId: "G-L1TRCY4FGT",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();
export default db;
