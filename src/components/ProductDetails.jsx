import React from 'react'
import { useState, useEffect } from 'react'
import shirt from '../assets/shirt.svg'
import ItemAtc from './ItemAtc';

const ProductDetails = ({product}) => {
  const {title, description, price, Media, featuredImage, Inventory} = product;
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
    <>
      <article className='product-section-wrapper  relative h-full mx-auto product-detail group grid md:grid-cols-2 gap-10 w-full text-white mb-14'>
        <div className='media-grid grid grid-cols-2 gap-6'>
          <div className='img-wrapper col-span-2 flex h-[60vh] md:h-[80vh] bg-white p-4 rounded-lg smooth '>
              { featuredImage ? 
                <img className='w-full object-contain object-center transform smooth' src={`${featuredImage.data.attributes.url}`} alt={ title } /> 
                : 
                <span className='flex w-1/3 justify-center items-center mx-auto opacity-30'>
                  <img src={shirt} className="shirt" alt="Shirt icon" />
                </span> 
              }
          </div>
        </div>
        
        
        <div className="content-wrapper p-5 mt-5 flex flex-col gap-4 sticky top-0 h-max">
          <h1>{title}</h1>
          <p>{ description }</p>
          <h6 className='price-wrapper'>$ {price}</h6>
          <ItemAtc inventory={Inventory}  size={variant} initial={qty} productId={product.id} />
        </div>
      </article>
    </>
  )
}

export default ProductDetails;
/*  { Media.data.map((item, index) =>  
      <div className='img-wrapper flex h-64 lg:h-80 bg-white p-4 rounded-lg smooth '>
        <img className='w-full object-contain object-center transform smooth' src={`${item.attributes.url}`} alt={ title } />
      </div>
    )} */