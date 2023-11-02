import React from 'react'
import { useState, useEffect } from 'react'
import ItemListContainer from '../components/ItemListContainer.jsx'
import '../App.css'

const CategoryPage = ({data}) => {
    const [count, setCount] = useState(0)
    const [loading, setLoading] = useState(true);
  return (
    <>
      <div className='mt-24'>
        <ItemListContainer title="Indumentaria" products={data.filter(item => item.attributes.Category == "Indumentaria")} />
      </div>
    </>
  )
}

export default CategoryPage