import React, { useContext, useState } from 'react'
import cartContext from '../context/cartContext.js'
import { Link } from 'react-router-dom';
const CartPage = () => {
  const { cart, setCart } = useContext(cartContext);
  const [user, setUser] = useState(null);
  const [signup, setSignup] = useState(false);  

  const handleLogin = () => {
    // Implementa el inicio de sesión aquí
  };

  function groupItemsByProductId(items) {
    const groupedItems = {};
  
    items.forEach(item => {
      if (groupedItems[item.id]) {
        groupedItems[item.id].count += 1;
      } else {
        groupedItems[item.id] = { id: item.id, title: item.title, count: 1, price: item.price };
      }
    });
  
    return Object.values(groupedItems);
  }

  const cartSection = (
    <div>
      <h1>Tu carrito</h1>
      <div className='p-5'>
      { cart && cart.items ? (
        <div className=''>
          <ul>
            {groupItemsByProductId(cart.items).map(({ id, title, count, price }) => (
              <li key={id}>
                {title} - ${price} (x{count}) -- ${price * count}
              </li>
            ))}
          </ul>

          <button className='mt-8 mx-auto flex'>Finalizar compra</button>
        </div>
      ) : (
        <div className='flex flex-col gap-4 justify-center items-center'>
          <p>Está vacío...</p>
          <Link to="/" className=''>
            <button className='btn btn-primary text-white'>Volver al inicio</button>
          </Link>
        </div>
      )}
      </div>
    </div>
  );

  const signupClass = !signup ? 'active-toggler rounded-b-none' : 'rounded-b-none';
  const loginClass = !signup ? 'rounded-b-none' : 'active-toggler rounded-b-none';

  const authSection = (
    <div className='flex items-center flex-col'>
      {user ? (
        <div>
          <p>Bienvenido, {user.displayName}!</p>
          <button onClick={() => setUser(null)}>Cerrar sesión</button>
        </div>
      ) : (
        signup ? (
          <div className='flex items-center flex-col'>
            <h2 className='w-full grid grid-cols-2'>
              <button className={signupClass} onClick={() => setSignup(false)}>Registrarse</button>
              <button className={loginClass} onClick={() => setSignup(true)}>Iniciar sesión</button>
            </h2>
            <form id='login-form' className='p-5 bg-white bg-opacity-80 text-black w-full rounded rounded-t-none'>
              <div className='input-group'>
                <label htmlFor="email">Email</label>
                <input type='email' id='email' name='email' />
              </div>
              <div className='input-group'>
                <label htmlFor="password">Contraseña</label>
                <input type='password' id='password' name='password' />
              </div>
              <button type="button" className='mx-auto flex border border-black mt-2' onClick={handleLogin}>Iniciar sesión</button>
            </form>
          </div>
        ) : (
          <div className='flex items-center flex-col'>
            <h2 className='w-full grid grid-cols-2'>
              <button className={signupClass} onClick={() => setSignup(false)}>Registrarse</button>
              <button className={loginClass} onClick={() => setSignup(true)}>Iniciar sesión</button>
            </h2>
            <form id='register-form' className='p-5 bg-white bg-opacity-80 text-black w-full rounded rounded-t-none'>
              <div className='input-group'>
                <label htmlFor="name">Nombre</label>
                <input type='text' id='name' name='name' />
              </div>
              <div className='input-group'>
                <label htmlFor="email">Email</label>
                <input type='email' id='email' name='email' />
              </div>
              <div className='input-group'>
                <label htmlFor="password">Contraseña</label>
                <input type='password' id='password' name='password' />
              </div>
              <button type="button" className='mx-auto flex border-black mt-2' onClick={handleLogin}>Registrarse</button>
            </form>
          </div>
        )
      )}
    </div>
  );
  
  return (
      <div className='h-screen fluid-container grid grid-cols-1 lg:grid-cols-3'>
        <div className='order-last lg:order-first lg:col-span-2'>
          {cartSection}
        </div>
        <div className='order-first lg:order-last col-span-1'>
          {authSection}
        </div>
      </div>
  )
}

export default CartPage            
/* 
{data.items.map((item) => (
              <li key={item.id}>
                {item.size} - {item.name} - {item.number} - {item.price}
              </li>
            ))}}*/