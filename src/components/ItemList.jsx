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
        loop={true}
        grabCursor={true}
        centeredSlides={true}
        onSwiper={(swiper) => console.log(swiper)}
        >
            { products.map((item, index) =>  <SwiperSlide><Item key={index} product={item} /></SwiperSlide> )}
        </Swiper>
    </>
        
  )
}

export default ItemList