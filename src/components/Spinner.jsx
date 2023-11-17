import React from 'react'
import calcioLogo from '/logo_calcio_blanco_s-n.png'

const Spinner = () => {
  return (
    <div className='content-wrapper w-screen h-screen bg-black'>
        <div className="relative w-full h-full z-50 overflow-hidden flex flex-col items-center justify-center">
            <div className="loader ease-linear rounded-full h-12 w-12 mb-4"></div>
            <img className='object-contain w-full max-w-xs h-20' src={ calcioLogo } alt="Calcio" />
        </div>
    </div>
  )
}

export default Spinner