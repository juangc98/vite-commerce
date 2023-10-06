import React from 'react'
import Button from './Button.jsx'
const ItemListContainer = (props) => {
  return (
    <section className='section-wrapper py-6'>
        <div className='title-wrapper mb-4 flex justify-between items-center'>
            <h2>{props.title}</h2>
            <Button label={props.btn} textColor="white" bgColor="#000" />
            
        </div>
        <div className='content-wrapper'>

        </div>
        
    </section>
  )
}

export default ItemListContainer