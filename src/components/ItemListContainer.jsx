import React, { useEffect, useState } from 'react'
import Button from './Button.jsx'
import ItemList from './ItemList.jsx'
//import {storeData} from '../assets/data.js';

const ItemListContainer = (props) => {
  
  return (
    <section className='section-wrapper py-6'>
        <div className='title-wrapper mb-4 flex justify-between items-center fluid-container'>
            <h2 className='text-2xl lg:text-4xl font-bold'>{props.title}</h2>
            <Button label={props.btn} textColor="white" bgColor="#000" />
        </div>
        <div className='content-wrapper'>
          <ItemList products={props.products} />
        </div>
    </section>
  )
    /*if ( loading ) {
      return (
        <section className='section-wrapper py-6'>
            <div className='title-wrapper mb-4 flex justify-between items-center fluid-container'>
                <h2 className='text-2xl lg:text-4xl font-bold'>{props.title}</h2>
                <Button label={props.btn} textColor="white" bgColor="#000" />
            </div>
            <div className='content-wrapper'>
              <div className="relative w-full h-96 z-50 overflow-hidden flex flex-col items-center justify-center">
                <div className="loader ease-linear rounded-full h-12 w-12 mb-4"></div>
                <h2 className="text-center text-white text-xl font-semibold">Loading...</h2>
              </div>
            </div>
        </section>
      )
    } else {
      return (
        <section className='section-wrapper py-6'>
            <div className='title-wrapper mb-4 flex justify-between items-center fluid-container'>
                <h2 className='text-2xl lg:text-4xl font-bold'>{props.title}</h2>
                <Button label={props.btn} textColor="white" bgColor="#000" />
            </div>
            <div className='content-wrapper'>
              <ItemList products={props.products} />
            </div>
        </section>
      )
    }*/
    
}

export default ItemListContainer