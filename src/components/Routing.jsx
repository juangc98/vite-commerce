import React from 'react'
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import Home from '../pages/HomePage';
import ProductPage from '../pages/ProductPage';
import Cart from '../pages/CartPage';
import Contacto from '../pages/ContactPage';

import Navbar from '.././components/Navbar.jsx'
import Footer from '.././components/Footer.jsx'
import '../App.css'
import CategoryPage from '../pages/CategoryPage.jsx';

const apiUrl = import.meta.env.VITE_API_URL;


const Routing = () => {
    // mobile menu
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenuDrawer = () => {
    setIsMenuOpen(!isMenuOpen);
    // console.log("clicked", isMenuOpen);
    };
    const [count, setCount] = useState(0)
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
  
    const getData = () => {
      /**/return new Promise((resolve, reject) => {
        setTimeout(() => {
          setLoading(true);
          resolve(storeData);
        }, 2000);
      })
      
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
          // console.log(res.shirts);
          setLoading(false);
        })
      }, []);
    return (
        <>
            <BrowserRouter>
                <Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenuDrawer} />

                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/productos/:categoria' element={<CategoryPage data={} />} />
                    <Route path='/productos/:categoria/:id' element={<ProductPage />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/contacto' element={<Contacto />} />
                </Routes>
                
                <Footer /> 
            </BrowserRouter>
        </>
    )
}

export default Routing