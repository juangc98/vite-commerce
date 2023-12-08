import { createContext, useContext } from 'react'

const cartContext = createContext({
    buyer: {
      name: '',
      email: '',
      userId: ''
    },
    isloggedin: false,
    items: [],
    timestamp: '',
    total: '',
    setCart: () => {}
  });

  export default cartContext;

