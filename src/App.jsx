import React from 'react'
import { useState, useEffect } from 'react'
import Routing from './components/Routing.jsx'
import cartContext from './context/cartContext.js'
import { query, where, collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
import { appFirestore } from './services/firebaseConfig.js'

function App() {

  const [cart, setCart] = useState({buyer:{}, items:[]});

  const fetchFData = async () => {
    const db = getFirestore(appFirestore);
    //CAPTURE ORDER DATA
    /*const productsRef = collection(db, 'productos');
    getDocs(productsRef).then((querySnapshot) => {
      if (querySnapshot.size !== 0) {
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(data);
      }
    });*/
  };
  
  async function loadCartData () {
    // Intenta obtener el carrito desde localStorage
    const localStorageString = localStorage.getItem('order');
    const localStorageData = JSON.parse(localStorageString);
    console.log("Carrito en localStorage:", localStorageData);
    // Si hay datos en localStorage, utiliza esos datos
    if (localStorageData != null) {
      console.log(localStorageData.items)
      console.log("Carrito en localStorage:", localStorageData);
      setCart((prevCart) => ({
        ...prevCart,
        items: localStorageData.items, // Actualiza solo la propiedad 'items'
      }));
    } else {
      // Si no hay datos en localStorage, realiza una consulta a la base de datos
      const databaseCart = await fetchFData();
      setCart(databaseCart);
    }
  };

  useEffect(() => {
    loadCartData()
  }, [])

  return (
      <cartContext.Provider value={{ cart, setCart }}>
        <Routing />
      </cartContext.Provider>
  );
}

export default App;
