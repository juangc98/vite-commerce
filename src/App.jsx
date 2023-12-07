import React from 'react'
import { useState, useEffect } from 'react'
import Routing from './components/Routing.jsx'
import cartContext from './context/cartContext.js'
import { query, where, collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
import { appFirestore } from './services/firebaseConfig.js'

const db = getFirestore(appFirestore);
const ordersCollection = collection(db, 'orders');

function App() {

  const [cart, setCart] = useState({buyer:{}, items:[]});

  const fetchFData = async (userEmail) => {
    // Consulta todas las órdenes con el mismo buyer.email
    const querySnapshot = await getDocs(query(collection(db, "orders"), where("buyer.email", "==", userEmail)));

    // Inicializa un array para almacenar las órdenes que cumplen con los criterios
    const matchingOrders = [];

    querySnapshot.forEach((doc) => {
      const orderData = doc.data();
      // Verifica que el estado sea "open"
      if (orderData.status === "open") {
        matchingOrders.push(orderData);
      }
    });

    // Si hay órdenes abiertas, devuelve la primera (puedes ajustar esto según tus necesidades)
    if (matchingOrders.length > 0) {
      console.log("Matching orders:", matchingOrders);
      return matchingOrders[0];
    } else {
      console.log("No hay órdenes abiertas asociadas al usuario.");
      return null; // Puedes manejar este caso según tus necesidades
    }
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
      if ( JSON.stringify(cart) !== JSON.stringify(localStorageData) ) {
        setCart((prevCart) => ({
          ...prevCart,
          ...localStorageData // Actualiza solo la propiedad 'items'
        }));
      }
    } else {
      // Si no hay datos en localStorage, realiza una consulta a la base de datos
      if ( cart.buyer.email != null ) {
        console.log("Email del usuario:", cart.buyer.email);
        const userEmail = cart.buyer.email;
        console.log("Carrito en localStorage:", localStorageData);
        console.log("Email del usuario:", userEmail);
        const databaseCart = await fetchFData(userEmail);
        setCart(databaseCart);
      } else {
        console.log("No hay datos en localStorage ni email del usuario.");
        setCart(() => ({
          buyer: {},
          items: [],
          isloggedin: false
          })
        );
      }
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
