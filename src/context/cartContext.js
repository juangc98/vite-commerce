import { createContext, useContext } from 'react'

const cartContext = createContext({
    name: null,
    email: null,
    isLoggedIn: false,
    cart: []
  });

  export default cartContext;

