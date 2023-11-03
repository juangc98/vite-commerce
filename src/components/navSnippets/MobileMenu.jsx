import React from 'react'
import Logo from './Logo.jsx'
import NavList from './NavList.jsx'

const MobileMenu = (props) => {
  return (
    <div className='md:hidden'>
        <button onClick={props.toggleMenu} className='w-12 h-12 p-1 rounded-full bg-white fixed bottom-6 left-0 right-0 mx-auto flex'>x</button>
        <aside className={`fixed  inset-0 z-10 w-full h-screen p-4 bg-black flex-col ${props.isMenuOpen ? 'flex' : 'hidden'}`}>
            <button onClick={props.toggleMenu} className='text-white'>Close</button>
            <Logo />
            <NavList categories={props.categories} />
        </aside>
    </div>
  )
}

export default MobileMenu