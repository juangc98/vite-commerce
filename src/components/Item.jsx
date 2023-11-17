import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ItemAtc from './ItemAtc';

const ProductCards = ({product}) => {
  const {title, price, featuredImage, Inventory} = product.attributes;
  const [qty, setQty] = useState(1)
  const [variant, setVariant] = useState(Inventory[0].Size)
  const [stock, setStock] = useState(0)
  const apiUrl = import.meta.env.VITE_API_URL;

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

    return (
        <article className='product-card group flex flex-col w-full text-white px-5'>
          <Link to={`/producto/${product.attributes.slug}`}>
            <div className='img-wrapper flex h-64 lg:h-80 bg-white p-4 rounded-lg smooth'>
              <img className='w-full object-contain object-center transform smooth' src={`${featuredImage.data.attributes.url}`} alt={ title } />
            </div>
          </Link>
          <div className="content-wrapper p-4 mt-5 flex flex-col justify-center items-center text-center gap-4">
            <Link to={`/producto/${product.attributes.slug}`}>
              <h3>{ title }</h3>
            </Link>
            <h6 className='price-wrapper'>$ {price}</h6>
            <ItemAtc inventory={Inventory}  size={variant} price={price} title={title} productId={product.id} />
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