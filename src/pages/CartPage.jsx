import React, { useContext } from 'react'
import cartContext from '../context/cartContext.js'
import { Link } from 'react-router-dom';
const CartPage = () => {
  const { cart, setCart } = useContext(cartContext);

  
  if ( cart.items === undefined || cart.items.length == 0 ) {
    return(
    <>
    NADA
    </>
  )}
  return (
      <div className='h-screen fluid-container '>
        <h1>Tu carrito</h1>
        <div className='p-5'>
          <ul>
          {cart.items.map((product) => (
              <li key={product.id}>
                {/* Renderizar información del producto, por ejemplo: product.title, product.price, etc. */}
                {product.title} - ${product.price}
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
/* 
{data.items.map((item) => (
              <li key={item.id}>
                {item.size} - {item.name} - {item.number} - {item.price}
              </li>
            ))}}*/