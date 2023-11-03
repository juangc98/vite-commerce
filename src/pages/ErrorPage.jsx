import React from 'react'
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className=' flex justify-center items-center'>
        <div className='p-6 w-full max-w-md text-center min-h-[50vh] flex flex-col justify-center items-center'>
            <h1>404</h1>
            <h2 className='mb-4'>Esta página no existe</h2>
            <Link to="/">Volver al inicio</Link>
        </div>
    </div>
  )
}

export default ErrorPage