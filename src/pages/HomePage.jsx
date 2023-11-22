import React from 'react'
import { useState, useEffect } from 'react'
import ItemListContainer from '.././components/ItemListContainer.jsx'
import '../App.css'

//const apiUrl = import.meta.env.VITE_API_URL;

const HomePage = ({categories, products}) => {
 
  return (
    <>
      <div className=''>
      {categories.map((category, index) => {
        const filteredProducts = products.filter(product => product.category === category.id);
        return (
          <ItemListContainer
            key={index}
            title={category.title}
            products={filteredProducts}
          />
        );
      })}
      </div>
    </>
  )
}

export default HomePage