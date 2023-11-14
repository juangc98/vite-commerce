import React, { useContext } from 'react'
import cartContext from '../context/cartContext.js'

const CartPage = () => {
  const data = useContext(cartContext);
  return (
      <div className='h-screen fluid-container '>
        <h1>Tu carrito</h1>
        <div>
          <h2>Productos</h2>
          <ul>
            {data.cart.map((item, index) => {
              return <li key={index}>{item.name} - {item.price}</li>
            })}
          </ul>
        </div>
      </div>
  )
}

export default CartPage