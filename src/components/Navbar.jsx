import React from 'react'
import { useState, useEffect } from 'react'
import NavList from './navSnippets/NavList.jsx'
import Logo from './navSnippets/Logo.jsx'
import CartWidget from './navSnippets/CartWidget.jsx'
import MobileMenu from './navSnippets/MobileMenu.jsx'
import '../App.css'
const Navbar = (props) => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
    
  const toggleMenuDrawer = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className='navbar relative shadow-xl z-50 bg-white flex justify-between items-center flex-nowrap fluid-container py-4'>
        <div className='flex items-center gap-4'>
            <MobileMenu className='md:hidden z-50' isMenuOpen={isMenuOpen} toggleMenu={toggleMenuDrawer} categories={props.categories} />
            <Logo />
            <div className='hidden md:flex'>
              <NavList categories={props.categories}  />
            </div>
        </div>
        <CartWidget />
    </header>
  )
}

export default Navbar