import React from 'react'
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import { query, where, collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
import { appFirestore } from '../main.jsx'

import Home from '../pages/HomePage';
import ProductPage from '../pages/ProductPage';
import Cart from '../pages/CartPage';
import Contacto from '../pages/ContactPage';
import ErrorPage from '../pages/ErrorPage';
import CategoryPage from '../pages/CategoryPage.jsx';
import Navbar from '.././components/Navbar.jsx'
import Footer from '.././components/Footer.jsx'
import Spinner from './Spinner.jsx'
import '../App.css'

// import {storeData} from '../assets/data.js';
// const apiUrl = import.meta.env.VITE_API_URL;

const Routing = ({cat, prods, isloading}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const toggleMenuDrawer = () => {
      setIsMenuOpen(!isMenuOpen);
    };

    const fetchFData = async () => {
      setLoading(true);
      const db = getFirestore(appFirestore);
      const productsRef = collection(db, 'productos');
      getDocs(productsRef).then((querySnapshot) => {
        if (querySnapshot.size !== 0) {
          const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setProducts(data);
          console.log(data);
        }
      });
      const catRef = collection(db, 'categories');
      getDocs(catRef).then((querySnapshot) => {
        if (querySnapshot.size != 0) {
          const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
          setCategories(data);
          console.log(data);
        }
      })
    };

    useEffect(() => {
      setLoading(true);
      fetchFData()
        .finally(res => {
          setLoading(false);
        })
    }, []);
    
    if ( loading ) {
      return (
          <>
              <Spinner />
          </>
        )
    }
    return (
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