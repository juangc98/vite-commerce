import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;
const NavList = ({categories}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
  
    /*const getData = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          setLoading(true);
          resolve(storeData);
        }, 2000);
      })
      
      fetch(apiUrl + '/api/products?&populate=featuredImage&populate[0]=Inventory')
         .then(res => {
           return res.json();
         })
         .then(json => {
          setData(json.data);
          //console.log(json.data);
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
      }, []);*/
  return (
    <>
        <div className='flex flex-shrink-0'>
            <ul className='flex flex-col md:flex-row flex-nowrap gap-2 text-black'>
              {categories.map((category, index) => {
                return (
                  <li key={index}>
                    <Link to={`/categoria/${category.attributes.slug}`} >{category.attributes.title}</Link>
                  </li>
                );
              })}
                <li>
                    <Link to="/contacto" >Contacto</Link>
                </li>
            </ul>
        </div>
      
    </>
  )
}

export default NavList