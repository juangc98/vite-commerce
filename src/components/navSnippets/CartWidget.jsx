import React,{ useContext, useEffect } from 'react'
import cartContext from '../../context/cartContext.js'
import { Link } from 'react-router-dom';
import icon from '../../assets/basket.svg'
const CartWidget = (props) => {

  const { cart, setCart } = useContext(cartContext);

  return (
    <button className='btn cart-btn bg-black bg-opacity-30 p-1 relative'>
      <Link to="/cart">
        <img src={icon} className="basket w-8 h-8" alt="Basket icon" />
        <span className='indicator p-1 absolute -top-2 -right-2 w-6 h-6 text-xs bg-black rounded-full text-white'>{ cart.length }</span>
      </Link>
    </button>
  )
}
/*
<aside className={`cart-drawer fixed h-screen w-full z-20 bg-black bg-opacity-25 inset-0 ${props.isCartOpen ? 'flex' : 'hidden'}`} >
    <div onClick={props.toggleDrawer} className='z-10 absolute inset-0 w-full h-full'></div>
    <div className='w-full max-w-xl ml-auto bg-white flex flex-col p-4 relative z-20'>
        <button onClick={props.toggleDrawer}>Close</button>
    </div>
</aside>
*/
export default CartWidget