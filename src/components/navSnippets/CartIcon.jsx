import React from 'react'
import icon from '../../assets/basket.svg'
const CartIcon = (props) => {
  return (
    <button onClick={props.toggleDrawer} className='btn cart-btn bg-black bg-opacity-30 p-1 relative'>
      <div className='indicator absolute -top-3 -right-3 bg-black rounded-full text-white'>2</div>
      <img src={icon} className="basket w-8 h-8" alt="Basket icon" />
    </button>
  )
}

export default CartIcon