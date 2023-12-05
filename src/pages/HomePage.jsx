import React from 'react'
import { useState, useEffect } from 'react'
import Hero from '../components/Hero.jsx'
import ItemListContainer from '.././components/ItemListContainer.jsx'
import '../App.css'

//const apiUrl = import.meta.env.VITE_API_URL;

const HomePage = ({categories, products}) => {
 
  return (
    <>
      <Hero title='A la cancha con estilo Calcio.' subtitle='Todo para el fútbol. Todo para tu equipo.' cta='Ver Indumentaria' />
      <div className='flex flex-col'>
      {categories.map((category, index) => {
        const filteredProducts = products.filter(product => product.category === category.id);
        return (
          <ItemListContainer
            className='order-last'
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