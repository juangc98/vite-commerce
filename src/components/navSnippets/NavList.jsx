import React from 'react'
import { Link } from 'react-router-dom';
const NavList = ({categories}) => {
  
  return (
    <>
        <div className='flex flex-shrink-0'>
            <ul className='flex flex-col md:flex-row flex-nowrap gap-2 text-black'>
              {categories.map((category, index) => {
                const navClass = category.title === "Indumentaria" ? "order-first" : "";
                return (
                  <li className={navClass} key={index}>
                    <Link to={`/categoria/${category.slug}`} >{category.title}</Link>
                  </li>
                );
              })}
                <li>
                    <Link to="/contacto" >Contacto</Link>
                </li>
            </ul>
        </div>
      
    </>
  )
}

export default NavList