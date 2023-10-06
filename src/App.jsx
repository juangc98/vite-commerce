import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar.jsx'
import ItemListContainer from './components/ItemListContainer.jsx'
import Button from './components/Button.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [isCartOpen, setIsCartOpen] = useState(false);
  const toggleCartDrawer = () => {
    setIsCartOpen(!isCartOpen);
    console.log("clicked", isCartOpen);
  };

  return (
    <>
      <Navbar isCartOpen={isCartOpen} toggleDrawer={toggleCartDrawer} />
      <div className='mt-24 container'>
        <ItemListContainer title="First title" btn="First button" />
      </div>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <div className="py-2 mt-2 border-t border-white">
          <Button label="First Button" textColor="white" bgColor="#000" />
        </div>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
