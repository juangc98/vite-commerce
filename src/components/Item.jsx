import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import shirt from '../assets/shirt.svg'
import ItemAtc from './ItemAtc';
import ItemCount from './ItemCount';

const ProductCards = ({product}) => {
  const {title, price, featuredImage, Inventory} = product;
  const [variant, setVariant] = useState(Inventory[0].Size)

    return (
        <article className='product-card group flex flex-col w-full text-white px-5'>
          <Link to={`/producto/${product.slug}`}>
            <div className='img-wrapper flex h-64 lg:h-80 bg-white p-4 rounded-lg smooth'>
              { featuredImage ? 
                <img className='w-full object-contain object-center transform smooth' src={`${featuredImage.data.attributes.url}`} alt={ title } /> 
                : 
                <span className='flex w-1/3 justify-center items-center mx-auto opacity-30'>
                  <img src={shirt} className="shirt" alt="Shirt icon" />
                </span> 
              }
            </div>
          </Link>
          <div className="content-wrapper p-4 mt-5 flex flex-col justify-center items-center text-center gap-4">
            <Link to={`/producto/${product.slug}`}>
              <h3>{ title }</h3>
            </Link>
            <h6 className='price-wrapper'>$ {price}</h6>
            {
              product.category === "indumentaria" ?
               <ItemAtc inventory={Inventory}  size={variant} price={price} title={title} productId={product.id} />
               :
               <ItemCount inventory={Inventory} price={price} title={title} productId={product.id}  />
            }
           
          </div>
        </article>
      
    )
  }
export default ProductCards