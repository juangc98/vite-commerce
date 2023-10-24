import React from 'react'
import { Link, NavLink } from 'react-router-dom';
const NavList = () => {
  return (
    <div className='flex flex-shrink-0'>
        <ul className='flex flex-col md:flex-row flex-nowrap gap-2 text-black'>
            <li>
                <a to="/" className='text-black'>Link 1</a>
            </li>
            <li>
                <a href="" className='text-black'>Link 2</a>
            </li>
            <li>
                <a href="" className='text-black'>Link 3</a>
            </li>
        </ul>
    </div>
  )
}

export default NavList