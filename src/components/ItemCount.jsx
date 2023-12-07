import React, { useState, useEffect, useContext } from 'react'
import cartContext from '../context/cartContext.js'
import { atcSubmit } from '../context/cartFunctions.js';
import { Link } from 'react-router-dom';

const ItemCount = ({inventory, productId, title, price}) => {
    const { cart, setCart } = useContext(cartContext);
    const [qty, setQty] = useState(1)
    const [stock, setStock] = useState(inventory[0].Stock)

    const newProducts = Array.from({ length: qty }, () => ({
      id: productId,
      title: title,
      price: price,
      size: 'Unico',
      name: null,
      number: null
    }));

    function increment() {
        let quantity = qty;
        if (quantity < stock) {
            quantity++;
            setQty(quantity)
        }
    }
    function decrement() {
        let quantity = qty;
        if (quantity > 1) {
            quantity--;
            setQty(quantity)
        }
    }

    function stockValidation() {
      const itemsInCart = cart.items.filter(item => item.id === productId);
      const totalInCart = itemsInCart.length;
      // console.log(totalInCart.length + " vs " + stock);
      if (totalInCart < stock) {
        atcSubmit(newProducts, setCart);
      } else {
        alert('Ya añadiste todo el stock disponible: ' + totalInCart + '/' + stock );
      }
    }

    if (cart && cart.items && cart.items.length > 0 ) {
      if (cart.items.map(item => item.id).includes(productId)) {
        return (
          <div>
            <Link to='/cart'><button className='atc-btn'>Ver carrito</button></Link>
          </div>
        );
      }
    }

    return (
        <div>
            <div className='qty-picker flex flex-nowrap gap-2 items-center mb-2'>
                <button className='minus' onClick={decrement}>-</button>
                <h4>{qty}</h4>
                <button className='plus' onClick={increment}>+</button>
            </div>
            <button className='atc-btn' onClick={stockValidation}>
                Añadir
            </button>
        </div>
    )
}

export default ItemCount