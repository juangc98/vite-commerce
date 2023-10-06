import React,{ useState } from 'react'

const CartWidget = (props) => {

  return (
    <aside className={`cart-drawer fixed h-screen w-full z-20 bg-black bg-opacity-25 inset-0 ${props.isCartOpen ? 'flex' : 'hidden'}`} >
        <div onClick={props.toggleDrawer} className='z-10 absolute inset-0 w-full h-full'></div>
        <div className='w-full max-w-xl ml-auto bg-white flex flex-col p-4 relative z-20'>
            <button onClick={props.toggleDrawer}>Close</button>
        </div>
    </aside>
  )
}

export default CartWidget