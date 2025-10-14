import React, { useState, useEffect, useContext } from 'react'
import cartContext from '../context/cartContext.js'
import shirt from '../assets/shirt.svg'
import ItemAtc from './ItemAtc';
import ItemCount from './ItemCount';

const ProductDetails = ({product}) => {
  const {title, description, price, Media, featuredImage, Inventory, category} = product;
  const [qty, setQty] = useState(1);
  const { cart, setCart } = useContext(cartContext);
  const [variant, setVariant] = useState(Inventory[0].Size)

  // Get items already in cart for this product
  const itemsInCart = cart.items.filter(item => item.id === product.id);
  const groupedCartItems = itemsInCart.reduce((acc, item) => {
    const key = `${item.size}-${item.name || 'no-name'}-${item.number || 'no-number'}`;
    if (!acc[key]) {
      acc[key] = { ...item, count: 0 };
    }
    acc[key].count++;
    return acc;
  }, {});

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

          {/* Show items already in cart */}
          {Object.keys(groupedCartItems).length > 0 && (
              <div className='bg-gray-800 bg-opacity-50 rounded-lg p-3 mb-2'>
                <h4 className='sr-only text-sm font-semibold text-white mb-2'>Items in cart:</h4>
                <div className='space-y-1'>
                  {Object.values(groupedCartItems).map((item, index) => (
                    <div key={index} className='flex justify-between items-center text-xs text-gray-300'>
                      <span>
                        {item.size} - {item.name || '(no name)'} - #{item.number || 'N/A'}
                      </span>
                      <span className='bg-gray-700 px-2 py-1 rounded text-white'>
                        x{item.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          <br />
          { 
          category == 'Indumentaria' ? 
          (<ItemAtc inventory={Inventory}  size={variant} price={price} title={title} productId={product.id} slug={product.slug} />) 
          : 
          (<ItemCount inventory={Inventory} price={price} title={title} productId={product.id} slug={product.slug} />) 
          }
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