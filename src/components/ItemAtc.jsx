import React, { useState, useEffect } from 'react'

const ItemAtc = ({size, initial, inventory, productId}) => {
    const [qty, setQty] = useState(initial)
    const [stock, setStock] = useState(0)
    const [variant, setVariant] = useState(size)

    function addToCart() {
        console.log("añadir:" + qty + " del producto: " + productId + " talle " + variant)
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

      function variantPicker() {
        setVariant(document.querySelector('input[name="size-picker"]:checked').value)
        //console.log(variant)
      }

      useEffect(() => {
        for (const element of inventory) {
          if (element.Size == variant) {
            setStock(element.Stock)
            //console.log(stock)
            break;
          }
        }
      })


    return (
        <form>
            <div className='size-picker-wrapper flex flex-row gap-2 flex-nowrap justify-center mb-4 items-center z-10'>
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
                    <input type="text" placeholder='Nombre' maxLength='15' className='p-2 rounded-md' />
                    <input type="number" placeholder='10' max='99' className='p-2 rounded-md max-w-[62px]' onKeyDown={numberValidation} />
                    <button className='atc-btn' onClick={() => addToCart()}>
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
        </form>
    )
/*
    if ( isAvailable ) {
        return (
            <div className='extra-inputs flex flex-nowrap gap-2 items-center z-10'>
                <input type="text" placeholder='Nombre' maxLength='15' className='p-2 rounded-md' />
                <input type="number" placeholder='10' max='99' className='p-2 rounded-md max-w-[62px]' onKeyDown={numberValidation} />
                <button className='atc-btn' onClick={() => addToCart()}>
                +
                </button>
            </div>
          )
    } else {
        return (
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
          )
    } */

}

export default ItemAtc