import React from 'react'
import NavList from './navSnippets/NavList.jsx'
import CartIcon from './navSnippets/CartIcon.jsx'
const Navbar = () => {
  return (
    <header className='flex justify-between items-center flex-nowrap'>
        <div>
            <NavList />
        </div>
        <CartIcon />
    </header>
  )
}

export default Navbar