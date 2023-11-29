import React from 'react'
import { useState, useEffect } from 'react'
import Routing from './components/Routing.jsx'
import cartContext from './context/cartContext.js'
import { query, where, collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
import { appFirestore } from './main.jsx'

function App() {

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    console.log("submit")
    const newCart = [...cart, product];
    console.log(newCart);
    setCart(newCart);
  };

  const contextData = {
    name: null,
    email: null,
    isLoggedIn: false,
    cart: cart,
    addToCart: addToCart,
    setCart: setCart
  }

  useEffect(() => {
    const db = getFirestore(appFirestore)
  }, [])

  return (
      <cartContext.Provider value={{ cart, setCart }}>
        <Routing />
      </cartContext.Provider>
  );
}

export default App;
