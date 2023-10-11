import React, { useEffect, useState } from 'react'
import Button from './Button.jsx'
import ItemList from './ItemList.jsx'
import {storeData} from '../assets/data.js';

const ItemListContainer = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(storeData);
      }, 2000);
    })
    // return fetch('https://fakestoreapi.com/products')
    //   .then(res => {
    //     return res.json();
    //   })
    //   .then(json => {
    //     setData(json);
    //     console.log(json);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   })
  }
  
  useEffect(() => {
      fetchData()
        .then(res => {
          setData(res.shirts);
          console.log(res.shirts);
        })
    });

    return (
      <section className='section-wrapper py-6'>
          <div className='title-wrapper mb-4 flex justify-between items-center fluid-container'>
              <h2 className='text-2xl lg:text-4xl font-bold'>{props.title}</h2>
              <Button label={props.btn} textColor="white" bgColor="#000" />
          </div>
          <div className='content-wrapper'>
            <ItemList products={data} />
          </div>
      </section>
    )
}

export default ItemListContainer