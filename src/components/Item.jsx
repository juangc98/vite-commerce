import React from 'react'
import ItemCount from './ItemCount.jsx'

const ProductCards = ({product}) => {
  const {id, title, description, image, price, stock} = product;
        return (
          <article className='product-card group flex flex-col w-full text-white px-5'>
            <div className='img-wrapper flex h-64 lg:h-80 bg-white p-4 rounded-lg smooth'>
              <img className='w-full object-contain object-center transform smooth' src={ image } alt={ title } />
            </div>
            <div className="content-wrapper p-4 mt-5 flex flex-col justify-center items-center text-center gap-4">
              <h3>{title}</h3>
              <h6 className='price-wrapper'>$ {price}</h6>
              <ItemCount productId={id} stock={stock} initial={1} />
            </div>
          </article>
        )
    }

export default ProductCards