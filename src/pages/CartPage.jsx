import React, { useContext, useState } from 'react'
import { query, where, collection, doc, setDoc, addDoc, getDoc, getDocs, updateDoc, getFirestore, serverTimestamp } from "firebase/firestore";
import { appFirestore } from '../services/firebaseConfig.js'
import cartContext from '../context/cartContext.js'
import { Link } from 'react-router-dom';
import { checkoutOrder } from '../context/cartFunctions.js';


const CartPage = () => {
  const { cart, setCart } = useContext(cartContext);
  const [user, setUser] = useState(cart.buyer);
  const [signup, setSignup] = useState(false);  
  const db = getFirestore(appFirestore);

  const handleLogin = async () => {
    const email = document.getElementById('login-email').value;
    // Realiza una consulta para buscar un usuario con el mismo correo electrónico
    const userQuery = query(collection(db, 'users'), where('email', '==', email));
    const userQuerySnapshot = await getDocs(userQuery);

    if (!userQuerySnapshot.empty) {
      const userDoc = userQuerySnapshot.docs[0];
      console.log('Usuario encontrado:', userDoc.data());
      const userData = userDoc.data();
      const localStorageData = JSON.parse(localStorage.getItem('order'));
      const updatedOrderData = {
        ...localStorageData,
        buyer: {
          name: userData.name,
          email: userData.email,
          userId: userDoc.id,
          phone: userData.phone,
        },
        isloggedin: true
      };
      localStorage.setItem('order', JSON.stringify(updatedOrderData));
      setCart((prevCart) => ({
        ...prevCart,
        buyer: updatedOrderData.buyer,
        isloggedin: true
      }));
    } else {
      alert('Usuario no encontrado');
    }
  };

  function logout() {
    console.log('logout');
    localStorage.removeItem('order');
    setCart((prevCart) => ({
      ...prevCart,
      buyer: null,
      isloggedin: false
    }));
    setUser(null);

  }

  function groupItemsByIdAndSize(items) {
    const groupedItems = {};
  
    items.forEach(item => {
      const key = item.id;
    
      if (!groupedItems[key]) {
        groupedItems[key] = {};
      }
    
      if (!groupedItems[key][item.size]) {
        const objItem = {
          size: item.size,
          name: item.name,
          number: item.number
        };
        groupedItems[key][item.size] = {
          id: item.id,
          title: item.title,
          size: item.size,
          count: 1,
          price: item.price,
          items: [objItem]
        };
      } else {
        const existingSize = groupedItems[key][item.size];
        existingSize.count += 1;
        existingSize.items.push({
          size: item.size,
          name: item.name,
          number: item.number
        });
      }
    });
  
    return groupedItems;
  }

  const groupedItems = groupItemsByIdAndSize(cart.items);

  const cartSection = (
    <div className='px-6'>
      <h1>Tu carrito</h1>
      <div className='py-5'>
      { cart && cart.items && cart.items.length > 0 ? (
        <div className=''>
          {Object.values(groupedItems).map(group => (
              <div className='cart-item-group py-2 w-full border border-white'>
                {Object.values(group).map(sizeGroup => (
                  <div className='cart-item p-2 '>
                    <h2 className='text-2xl font-bold'>{sizeGroup.title}</h2>
                    <div className={`text-xl px-4 mt-2 ${sizeGroup.size}`} key={`${group.id}-${sizeGroup.size}`}>
                      <div className='flex justify-between'><h4>{sizeGroup.size}: x{sizeGroup.count}</h4> <h5> ${sizeGroup.price}</h5></div>
                      
                      <ul className='px-4 text-base'>
                        {sizeGroup.items.map(item => (
                          <li>
                            {`${item.name != null ? item.name : '(sin nombre)' } | ${item.number != null ? item.number : '(x)' } `}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
          ))}
          <div className='flex justify-between px-6 py-2 text-xl font-bold'>
            <h3>Total:</h3>
            <h4>$ {cart.total}</h4>
          </div>
          <button onClick={() => checkoutOrder(setCart)} className='mt-5 flex justify-center mx-auto max-w-xs w-full bg-white bg-opacity-50 text-black text-lg'>Finalizar compra</button>
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
      {cart.buyer ? (
        <div className='w-full px-6 flex flex-col gap-5 items-center'>
          <h2 className='text-2xl'>Bienvenido, {cart.buyer.name}!</h2>
          { cart && cart.items.length > 0 ? 
          ( <button onClick={() => checkoutOrder(setCart)} className='max-w-xs w-full bg-white bg-opacity-50 text-black text-lg'>Finalizar compra</button> ) : ( <></>) }
          <button className=' max-w-xs w-full' onClick={logout}>Cerrar sesión</button>
        </div>
      ) : (
        signup ? (
          <div className='flex items-center flex-col px-6'>
            <h2 className='w-full grid grid-cols-2'>
              <button className={signupClass} onClick={() => setSignup(false)}>Registrarse</button>
              <button className={loginClass} onClick={() => setSignup(true)}>Iniciar sesión</button>
            </h2>
            <form id='login-form' className='p-5 bg-white bg-opacity-80 text-black w-full rounded rounded-t-none'>
              <div className='input-group'>
                <label htmlFor="email">Email</label>
                <input type='email' id='login-email' name='email' />
              </div>
              <div className='input-group'>
                <label htmlFor="password">Contraseña</label>
                <input type='password' id='password' name='password' />
              </div>
              <button type="button" className='mx-auto flex border border-black mt-2' onClick={handleLogin}>Iniciar sesión</button>
            </form>
          </div>
        ) : (
          <div className='flex items-center flex-col px-6'>
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
      <div className='min-h-screen fluid-container grid grid-cols-1 lg:grid-cols-3'>
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