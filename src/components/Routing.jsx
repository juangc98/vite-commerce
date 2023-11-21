import React from 'react'
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import Home from '../pages/HomePage';
import ProductPage from '../pages/ProductPage';
import Cart from '../pages/CartPage';
import Contacto from '../pages/ContactPage';
import ErrorPage from '../pages/ErrorPage';
import CategoryPage from '../pages/CategoryPage.jsx';
import Navbar from '.././components/Navbar.jsx'
import Footer from '.././components/Footer.jsx'
import Spinner from '.././components/Spinner.jsx'
import '../App.css'

import {storeData} from '../assets/data.js';
const apiUrl = import.meta.env.VITE_API_URL;


const Routing = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const toggleMenuDrawer = () => {
    setIsMenuOpen(!isMenuOpen);
    };
    
    const getData = () => {
      /**/
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          setLoading(true);
          resolve(storeData);
        }, 2000);
      })
      
      // FETCH FOR STRAPI API IN LOCAL
      /*fetch(apiUrl + '/api/products?&populate=*')
          .then(res => {
          return res.json();
          })
          .then(json => {
          setProducts(json.data);
          console.log(json.data);
          })
          .catch(err => {
          console.log(err);
          })
          .finally(() => {
          setLoading(false);
          });
      fetch(apiUrl + '/api/categories')
          .then(res => {
          return res.json();
          })
          .then(json => {
          setCategories(json.data);
          console.log(json.data);
      })
      .catch(err => {
          console.log(err);
      })
      .finally(() => {
          setLoading(false);
      })*/
    }
    useEffect(() => {
      getData()
        .then(res => {
          setProducts(res.products);
          setCategories(res.categories);
          setLoading(false);
        })
      }, []);

    return (
      loading ? <Spinner /> :
        <>
            <BrowserRouter>
                <Navbar categories={categories} isMenuOpen={isMenuOpen} toggleMenu={toggleMenuDrawer} />
                <Routes>
                    <Route path='/' element={<Home categories={categories} products={products} />} />
                    <Route path='/categoria/:slug' element={<CategoryPage categories={categories} products={products} />} />
                    <Route path='/producto/:slug' element={<ProductPage products={products} />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/contacto' element={<Contacto />} />
                    <Route path='*' element={<ErrorPage />} />
                </Routes>
                <Footer /> 
            </BrowserRouter>
        </>
    )
}

export default Routing