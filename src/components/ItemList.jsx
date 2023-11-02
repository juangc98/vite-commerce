import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import Item from './Item.jsx'

const ItemList = ({products}) => {
  return (
    <>
        <Swiper
        className='mySwiper item-list-carousel'
        slidesPerView={'auto'}
        grabCursor={true}
        centeredSlides={true}
        >
            { products.map((item, index) =>  <SwiperSlide key={index}><Item key={index} product={item} /></SwiperSlide> )}
        </Swiper>
    </>
        
  )
}

export default ItemList