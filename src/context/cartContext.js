import { createContext, useContext } from 'react'

const cartContext = createContext({
    buyer: {
      name: '',
      email: '',
      userId: '',
      phone: '',
    },
    isLoggedIn: false,
    items: [],
    timestamp: '',
    total: '',
    setCart: () => {}
  });

  export default cartContext;

