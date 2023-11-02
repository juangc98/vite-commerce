import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ProductDetails from '../components/ProductDetails'

const apiUrl = import.meta.env.VITE_API_URL;

const ProductPage = () => {
  const { id } = useParams()
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
    ?&populate=featuredImage&populate[0]=Inventory
    */
    fetch(apiUrl + '/api/products/' + id )
        .then(res => {
          return res.json();
        })
        .then(json => {
          setData(json.data);
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
    <div className='mt-24'>
      <h1>ProductPage</h1>
      <p>ID: {id}</p>
      <ProductDetails />
    </div>
  )
}

export default ProductPage