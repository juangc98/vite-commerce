import { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ItemListContainer from './components/ItemListContainer.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  // cart drawer
  const [isCartOpen, setIsCartOpen] = useState(false);
  const toggleCartDrawer = () => {
    setIsCartOpen(!isCartOpen);
    console.log("clicked", isCartOpen);
  };
  // mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenuDrawer = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log("clicked", isMenuOpen);
  };

  return (
    <>
      <Navbar isCartOpen={isCartOpen} toggleDrawer={toggleCartDrawer} isMenuOpen={isMenuOpen} toggleMenu={toggleMenuDrawer} />
      <div className='mt-24 fluid-container h-screen'>
        <h1>Vite + React</h1>
        <ItemListContainer title="First title" btn="First button" />
      </div>
      <Footer />
    </>
  )
}

export default App
