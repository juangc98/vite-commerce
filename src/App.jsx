import React from 'react'
import Routing from './components/Routing.jsx'
import cartContext from './context/cartContext.js'

function App() {

  const contextData = {
    name: null,
    email: null,
    isLoggedIn: false,
    cart: [
        {id: 1, name: 'Product 1', price: 100, quantity: 1}
    ],
  }

  return (
      <cartContext.Provider value={contextData}>
        <Routing />
      </cartContext.Provider>
  );
}

export default App;
