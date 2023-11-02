import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Home from './pages/HomePage';
import Product from './pages/ProductPage';
import Contact from './pages/ContactPage';

import Routing from './components/Routing.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ItemListContainer from './components/ItemListContainer.jsx'
import './App.css'
// pages

const apiUrl = import.meta.env.VITE_API_URL;

function App() {
  const [count, setCount] = useState(0)
  const [isCartOpen, setIsCartOpen] = useState(false);
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
    fetch(apiUrl + '/api/products?&populate=featuredImage&populate[0]=Inventory')
       .then(res => {
         return res.json();
       })
       .then(json => {
        let shirts = json.data.filter(item => item.attributes.Category == "Shirts");
        let acc = json.data.filter(item => item.attributes.Category == "Accesories");
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
    }, []);

  const toggleCartDrawer = () => {
    setIsCartOpen(!isCartOpen);
    // console.log("clicked", isCartOpen);
  };
  // mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenuDrawer = () => {
    setIsMenuOpen(!isMenuOpen);
    // console.log("clicked", isMenuOpen);
  };

  return (
    <>
      <Routing />
    </>
    
  )
}

export default App
