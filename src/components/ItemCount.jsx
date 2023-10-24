import React, { useState } from 'react'

const ItemCount = ({stock, size, initial, onAdd, productId}) => {
    const [qty, setQty] = useState(initial)
    const [isAvailable] = useState( stock >= 1 ? true : false)

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
    function addToCart(id, amount) {
        console.log("añadir:" + amount + " del producto: " + id + " talle " + size)
    }

    if ( isAvailable) {
        return (
            <>
                <div className='qty-picker flex flex-nowrap gap-2 items-center'>
                    <button className='minus' onClick={decrement}>-</button>
                    <h4>{qty}</h4>
                    <button className='plus' onClick={increment}>+</button>
                </div> 
                <div>
                    <button className='atc-btn' onClick={() => addToCart(productId, qty)}>
                        Añadir
                    </button>
                </div>
            </>
          )
    } else {
        return (
            <>
                <div className=''>
                    <button className='atc-btn' disabled='true'>
                       Sin Stock
                    </button>
                </div>
                <div>
                    <a href="">Notificarme</a>
                </div>
            </>
          )
    }

}

export default ItemCount