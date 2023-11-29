import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ErrorPage from './ErrorPage.jsx'
import ProductDetails from '../components/ProductDetails'
const apiUrl = import.meta.env.VITE_API_URL;

const ProductPage = ({ products }) => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    //console.log( slug )
    const myProduct = products.find(product => product.slug === slug);
    //console.log( products )
    if (myProduct) {
      setProduct(myProduct);
    }
  }, [products, slug]);

  if (!product) {
    return <ErrorPage />;
  } else {
    return (
      <div className='fluid-container'>
        <ProductDetails product={product} />
      </div>
    );
  }
};

export default ProductPage;