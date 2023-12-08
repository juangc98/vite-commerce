// NO UTILIZADO
import { createContext, useContext } from 'react'

const userContext = createContext({
    name: '',
    email: '',
    userId: '',
    setUser: () => {}
  });

export default userContext;