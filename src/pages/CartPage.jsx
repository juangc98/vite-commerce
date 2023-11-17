import React, { useContext } from 'react'
import cartContext from '../context/cartContext.js'

const CartPage = () => {
  const data = useContext(cartContext);
  return (
      <div className='h-screen fluid-container '>
        <h1>Tu carrito</h1>
        <div className='p-5'>
          <ul>
            {data.cart.map((item) => (
              <li key={item.id}>
                {item.size} - {item.name} - {item.number} - {item.price}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <button>Finalizar compra</button>
        </div>
      </div>
  )
}

export default CartPage