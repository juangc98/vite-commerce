import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ErrorPage from './ErrorPage.jsx'
import ItemListContainer from '../components/ItemListContainer.jsx'
import '../App.css'

const CategoryPage = ({ categories, products }) => {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const myCategory = categories.find(cat => cat.slug === slug);

    if (myCategory) {
      setCategory(myCategory);
      const categoryProducts = products.filter(product => product.category === myCategory.id);
      setFilteredProducts(categoryProducts);
    }
  }, [categories, products, slug]);

  
  if (!category) {
    // Manejo para cuando no se encuentra la categoría
    return (
      <ErrorPage />
    );
  } else {
    return (
      <div className=''>
        <ItemListContainer
          key={category.id}
          title={category.title}
          products={filteredProducts}
        />
      </div>
    );
  }
};

export default CategoryPage