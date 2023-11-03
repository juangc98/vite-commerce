import React, { useEffect, useState } from 'react'
import Button from './Button.jsx'
import ItemList from './ItemList.jsx'
//import {storeData} from '../assets/data.js';

const ItemListContainer = (props) => {
  
  return (
    <section className='section-wrapper'>
        <div className='title-wrapper mb-4 flex justify-between items-center fluid-container'>
            <h2 className='text-2xl lg:text-4xl font-bold capitalize'>{props.title}</h2>
            <Button label={props.btn} textColor="white" bgColor="#000" />
        </div>
        <div className='content-wrapper'>
          <ItemList products={props.products} />
        </div>
    </section>
  )
    
}

export default ItemListContainer