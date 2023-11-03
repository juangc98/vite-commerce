import React from 'react'
import calcioLogo from '/logo_calcio_negro_alpha.png'
import { Link } from 'react-router-dom';
const Logo = () => {
  return (
    <>
        <Link to="/" className='flex w-full max-w-[90px]  relative'>
            <img className='object-contain w-full h-10' src={ calcioLogo } alt="Calcio" />
        </Link>
    </>
  )
}

export default Logo