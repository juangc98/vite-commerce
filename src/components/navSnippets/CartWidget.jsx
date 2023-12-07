import React,{ useContext, useEffect } from 'react'
import cartContext from '../../context/cartContext.js'
import { Link } from 'react-router-dom';
import icon from '../../assets/basket.svg'
const CartWidget = (props) => {

  const { cart } = useContext(cartContext);

  return (
    <button className='btn cart-btn bg-black bg-opacity-30 p-1 relative'>
      <Link to="/cart">
        <img src={icon} className="basket w-8 h-8" alt="Basket icon" />
        {
          cart && cart.items && cart.items.length > 0 ? <span className='indicator p-1 absolute -top-2 -right-2 w-6 h-6 text-xs bg-black rounded-full text-white'>{ cart.items.length }</span> : ''
        }
      </Link>
    </button>
  )

}
export default CartWidget