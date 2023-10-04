import React from 'react'
import icon from '../../assets/basket.svg'
const CartIcon = () => {
  return (
    <button className=' '>
      <img src={icon} className="basket w-8 h-8" alt="Basket icon" />
    </button>
  )
}

export default CartIcon