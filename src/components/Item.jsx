import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ProductCards = ({product}) => {
  const {Title, Price, featuredImage, Inventory} = product.attributes;
  const [qty, setQty] = useState(1)
  const [variant, setVariant] = useState(Inventory[0].Size)
  const [stock, setStock] = useState(0)
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    for (const element of Inventory) {
      if (element.Size == variant) {
        setStock(element.Stock)
        //console.log(stock)
        break;
      }
    }
  })

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
  function addToCart() {
      console.log("añadir:" + qty + " del producto: " + product.id + " talle " + variant)
  }
  function variantPicker() {
    setVariant(document.querySelector('input[name="size-picker"]:checked').value)
    //console.log(variant)
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

    return (
        <article className='product-card group flex flex-col w-full text-white px-5'>
          <Link to={`/productos/${product.id}`}>
            <div className='img-wrapper flex h-64 lg:h-80 bg-white p-4 rounded-lg smooth'>
              <img className='w-full object-contain object-center transform smooth' src={`${apiUrl}${featuredImage.data.attributes.url}`} alt={ Title } />
            </div>
          </Link>
          <div className="content-wrapper p-4 mt-5 flex flex-col justify-center items-center text-center gap-4">
            <Link to="/">
              <h3>{Title}</h3>
            </Link>
            <h6 className='price-wrapper'>$ {Price}</h6>
            <div className='size-picker-wrapper flex flex-row gap-2 flex-nowrap items-center z-10'>
              { Inventory.map((item, index) =>
                <div className='input-group ' key={index}>
                  <input id={`size-picker-${item.Size}-${product.id}`} className='hidden' name='size-picker' type='radio' value={item.Size} defaultChecked={item.Size === variant} onChange={variantPicker} />
                  <label className='' htmlFor={`size-picker-${item.Size}-${product.id}`}>
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
      
          </div>
        </article>
      
    )
  }
/*
<div className='qty-picker flex flex-nowrap gap-2 items-center'>
  <button className='minus' onClick={decrement}>-</button>
  <h4>{qty}</h4>
  <button className='plus' onClick={increment}>+</button>
</div>
<div>
  <button className='atc-btn' onClick={() => addToCart()}>
    Añadir
  </button>
</div>
*/
export default ProductCards