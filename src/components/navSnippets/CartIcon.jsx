import React from 'react'
import icon from '../../assets/basket.svg'
const CartIcon = (props) => {
  return (
    <button onClick={props.toggleDrawer} className='btn cart-btn bg-black bg-opacity-30 p-1'>
      <img src={icon} className="basket w-8 h-8" alt="Basket icon" />
    </button>
  )
}

export default CartIcon