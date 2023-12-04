import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_apiKey,
    authDomain: import.meta.env.VITE_API_authDomain,
    projectId: import.meta.env.VITE_API_projectId,
    storageBucket: import.meta.env.VITE_API_storageBucket,
    messagingSenderId: import.meta.env.VITE_API_messagingSenderId,
    appId: import.meta.env.VITE_API_appId
  };

 export const appFirestore = initializeApp(firebaseConfig);