import React from 'react'
import calcioLogo from '/logo_calcio_blanco_s-n.png'
const Footer = () => {
  return (
    <footer className='w-full pt-16 pb-12 fluid-container bg-black'>
        <a href="/" className='flex w-full relative'>
            <img className='object-contain w-full h-36' src={ calcioLogo } alt="Calcio" />
        </a>
    </footer>
  )
}

export default Footer