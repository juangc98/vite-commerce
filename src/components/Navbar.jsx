import React from 'react'
import NavList from './navSnippets/NavList.jsx'
import Logo from './navSnippets/Logo.jsx'
import CartWidget from './navSnippets/CartWidget.jsx'
import icon from '../assets/basket.svg'
const Navbar = (props) => {
  
  return (
    <header className='navbar fixed top-0 shadow-xl z-50 bg-white flex justify-between items-center flex-nowrap container py-4'>
        <div className='flex items-center gap-4'>
            <Logo />
            <NavList />
        </div>
        <button onClick={props.toggleDrawer} isCartOpen={props.isCartOpen} className='btn cart-btn bg-black bg-opacity-30 p-1'>
          <img src={icon} className="basket w-8 h-8" alt="Basket icon" />
        </button>
        <CartWidget isCartOpen={props.isCartOpen} toggleDrawer={props.toggleDrawer} />
    </header>
  )
}

export default Navbar