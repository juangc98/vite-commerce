import React, { useState, useEffect } from 'react'
import ItemCount from './ItemCount.jsx'

const ProductCards = ({product}) => {
  const {Title, Price, featuredImage, Inventory} = product.attributes;
  const [qty, setQty] = useState(1)
  const [variant, setVariant] = useState(Inventory[0].Size)
  const [stock, setStock] = useState(0)
  
  //for (const element of Inventory) {
  //  if (element.Stock > 0) {
  //    setVariant(element.Size);
  //    break;
  //  }
  //}

  useEffect(() => {
    for (const element of Inventory) {
      if (element.Size == variant) {
        setStock(element.Stock)
        console.log(stock)
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
    console.log(variant)
  }

    return (
      <article className='product-card group flex flex-col w-full text-white px-5'>
        <div className='img-wrapper flex h-64 lg:h-80 bg-white p-4 rounded-lg smooth'>
          <img className='w-full object-contain object-center transform smooth' src={`http://localhost:1337${featuredImage.data.attributes.url}`} alt={ Title } />
        </div>
        <div className="content-wrapper p-4 mt-5 flex flex-col justify-center items-center text-center gap-4">
          <h3>{Title}</h3>
          <h6 className='price-wrapper'>$ {Price}</h6>
          <div className='size-picker-wrapper flex flex-row gap-2 flex-nowrap items-center'>
            { Inventory.map((item, index) => 
              <label key={index} htmlFor={`size-picker-${item.Size}-${product.id}`}>
                <input id={`size-picker-${item.Size}-${product.id}`} name='size-picker' type='radio' value={item.Size} defaultChecked={item.Size === variant} onChange={variantPicker} />
                {item.Size} ({item.Stock})
              </label>
            )}
          </div>
          { stock > 0 ? (
            <>
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
            </>
          ) : (
            <>
              <div className=''>
                <button className='atc-btn' disabled={true}>
                  Sin Stock
                </button>
              </div>
              <div>
                <a href="#">Notificarme</a>
              </div>
            </>
          )}
    
        </div>
      </article>
    )
  }
// { Inventory.map((item, index) =>  <ItemCount productId={product.id} index={index} size={item.Size} stock={item.Stock} initial={1} /> )}
export default ProductCards