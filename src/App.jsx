import React from 'react'
import { useState, useEffect } from 'react'
import Routing from './components/Routing.jsx'
import cartContext from './context/cartContext.js'

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
  }

  return (
      <cartContext.Provider value={contextData}>
        <Routing />
      </cartContext.Provider>
  );
}

export default App;
