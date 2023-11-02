import React from 'react'
import { useState, useEffect } from 'react'
import ItemListContainer from '.././components/ItemListContainer.jsx'
import '../App.css'

const apiUrl = import.meta.env.VITE_API_URL;

const HomePage = () => {
    const [count, setCount] = useState(0)
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
  
    const getData = () => {
      /*return new Promise((resolve, reject) => {
        setTimeout(() => {
          setLoading(true);
          resolve(storeData);
        }, 2000);
      })
      */
      fetch(apiUrl + '/api/products?&populate=*')
         .then(res => {
           return res.json();
         })
         .then(json => {
          setData(json.data);
          console.log(json.data);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        })
    }
    useEffect(() => {
      getData()
        //.then(res => {
        //  setData(res.shirts);
        //  // console.log(res.shirts);
        //  setLoading(false);
        //})
      }, []);
  return (
    <>
      <div className='mt-24'>
        <ItemListContainer title="Indumentaria" products={data} />
        <ItemListContainer title="Accesorios" products={data} />
      </div>
    </>
  )
}

export default HomePage