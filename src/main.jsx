import React, { createContext, useContext, useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';

// Configura tu contexto de Firebase
const FirebaseContext = createContext();

// Componente que proporciona la instancia de Firebase al contexto
const FirebaseProvider = ({ children }) => {
  const [firebaseApp, setFirebaseApp] = useState(null);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    setFirebaseApp(app);
  }, []);

  return (
    <FirebaseContext.Provider value={firebaseApp}>
      {children}
    </FirebaseContext.Provider>
  );
};

// Función para usar la instancia de Firebase en otros componentes
const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase debe ser utilizado dentro de FirebaseProvider');
  }
  return context;
};

// Envuelve tu aplicación con FirebaseProvider para proporcionar la instancia de Firebase
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FirebaseProvider>
      <App />
    </FirebaseProvider>
  </React.StrictMode>,
);