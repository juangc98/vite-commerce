import React, { createContext, useContext, useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';

const firebaseConfig = {
  apiKey: "AIzaSyBk6El6ddX27sGKSFu-olwjeFaJrJkpkAM",
  authDomain: "calcio-ecommerce.firebaseapp.com",
  projectId: "calcio-ecommerce",
  storageBucket: "calcio-ecommerce.appspot.com",
  messagingSenderId: "357598994956",
  appId: "1:357598994956:web:5aa779a0aa3329a34f4429"
};

export const appFirestore = initializeApp(firebaseConfig);

// Configura tu contexto de Firebase
// const FirebaseContext = createContext();
// Componente que proporciona la instancia de Firebase al contexto
// const FirebaseProvider = ({ children }) => {
// const [firebaseApp, setFirebaseApp] = useState(null);
// 
// useEffect(() => {
//   const app = initializeApp(firebaseConfig);
//   setFirebaseApp(app);
// }, []);

// Envuelve tu aplicación con FirebaseProvider para proporcionar la instancia de Firebase
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
);