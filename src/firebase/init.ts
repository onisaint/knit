import { initializeApp } from "firebase/app";

const initFirebase = () =>
  initializeApp({
    apiKey: import.meta.env.VITE_FIREBASE_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJ,
    storageBucket: import.meta.env.VITE_FIREBASE_BKT,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MSG_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  });

export { initFirebase };
