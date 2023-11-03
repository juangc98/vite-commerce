import React from 'react'
import calcioLogo from '/logo_calcio_blanco_s-n.png'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='w-full py-12 fluid-container bg-black'>
        <Link to="/" className='flex w-max mx-auto relative'>
            <img className='object-contain w-full h-36' src={ calcioLogo } alt="Calcio" />
        </Link>
    </footer>
  )
}

export default Footer