import React, { useState, useEffect, useContext } from 'react'
import cartContext from '../context/cartContext.js'
import { atcSubmit } from '../context/cartFunctions.js';
 
const ItemAtc = ({size, inventory, productId, title, price}) => {
    const [stock, setStock] = useState(0)
    const [variant, setVariant] = useState(size)
    const [number, setNumber] = useState(null)
    const [name, setName] = useState(null)
    const { cart, setCart } = useContext(cartContext);

    const newProduct = { 
      id: productId,
      title: title,
      price: price,
      size: variant,
      name: name,
      number: number
    }
    function stockValidation() {
      const itemsInCart = cart.items.filter(item => item.id === productId && item.size === variant);
      const totalInCart = itemsInCart.length;
      // console.log(totalInCart.length + " vs " + stock);
      if (totalInCart < stock) {
        atcSubmit(newProduct, setCart);
      } else {
        alert('Ya añadiste todo el stock disponible: ' + totalInCart + '/' + stock );
      }
    }

    function numberValidation(e) {
      const value = e.target.value;
      if (value.length === 2) {
        if (e.key !== 'Backspace' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && e.key !== 'Delete') {
          e.preventDefault();
          alert('Solo se permiten numeros del 1 a 99');
        }
      } else if (value.length < 2) {
        if ( !isNaN(e.key) ) {
          console.log(value);
        } else if ( e.key !== 'Backspace' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && e.key !== 'Delete' ) {
          e.preventDefault();
          alert('Solo se permiten numeros del 1 a 99');
        }
      }
    }
    function variantPicker(e) {
      setVariant(e.target.value);
      for (const element of inventory) {
        if (element.Size == e.target.value) {
          setStock(element.Stock)
          //console.log(stock)
          break;
        }
      }
    }
    function numberPicker(e) {
      setNumber(e.target.value)
    }
    function namePicker(e) {
      setName(e.target.value)
    }

    useEffect(() => {
      for (const element of inventory) {
        if (element.Size === variant) {
          setStock(element.Stock);
          // console.log(stock);
          break;
        }
      }
    }, [inventory, variant]); 

    return (
        <div>
            <div className='size-picker-wrapper flex flex-row gap-2 flex-nowrap mb-4 items-center z-10'>
              { inventory.map((item, index) =>
                <div className='input-group ' key={index}>
                  <input id={`size-picker-${item.Size}-${productId}`} className='hidden' name='size-picker' type='radio' value={item.Size} defaultChecked={item.Size === variant} onChange={variantPicker} />
                  <label className='' htmlFor={`size-picker-${item.Size}-${productId}`}>
                    {item.Size}
                  </label>
                </div>
              )}
            </div>
            { stock > 0 ? (
                <>
                <div className='extra-inputs flex flex-nowrap gap-2 items-center z-10'>
                    <input type="text" id='name' placeholder='Nombre' maxLength='15' className='p-2 rounded-md' onChange={namePicker} />
                    <input type="number" id='number' placeholder='10' max='99' min='0' className='p-2 rounded-md max-w-[62px]' onKeyDown={numberValidation} onChange={numberPicker} />
                    <button className='atc-btn' onClick={stockValidation}>
                    +
                    </button>
                </div>
                </>
            ) : (
                <>
                <div className=''>
                    <button className='atc-btn' disabled={true}>
                    Sin Stock
                    </button>
                </div>
                <div className='z-10'>
                    <a href="#">Notificarme</a>
                </div>
                </>
            )}
        </div>
    )
}

export default ItemAtc