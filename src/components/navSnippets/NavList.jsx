import React from 'react'

const NavList = () => {
  return (
    <div>
        <ul className='flex flex-col lg:flex-row flex-nowrap gap-2'>
            <li>
                <a href="">Link 1</a>
            </li>
            <li>
                <a href="">Link 2</a>
            </li>
            <li>
                <a href="">Link 3</a>
            </li>
        </ul>
    </div>
  )
}

export default NavList