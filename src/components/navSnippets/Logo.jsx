import React from 'react'
import calcioLogo from '/logo_calcio_negro_alpha.png'
const Logo = () => {
  return (
    <>
        <a href="/" className='flex w-full max-w-[90px]  relative'>
            <img className='object-contain w-full h-10' src={ calcioLogo } alt="Calcio" />
        </a>
    </>
  )
}

export default Logo