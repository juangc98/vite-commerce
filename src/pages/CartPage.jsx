import React, { useContext, useState } from 'react'
import { query, where, collection, doc, setDoc, addDoc, getDoc, getDocs, updateDoc, getFirestore, serverTimestamp } from "firebase/firestore";
import { appFirestore } from '../services/firebaseConfig.js'
import cartContext from '../context/cartContext.js'
import { Link } from 'react-router-dom';
import { checkoutOrder, postDataToDatabase, groupItemsByIdAndSize, removeItemFromCart, clearCart } from '../context/cartFunctions.js';

const CartPage = () => {
  const { cart, setCart } = useContext(cartContext);
  const [total, setTotal] = useState(cart.total);
  const [signup, setSignup] = useState(false);  
  const db = getFirestore(appFirestore);
  const [ loginError, setLoginError ] = useState(false);
  const [ registerError, setRegisterError ] = useState(false);

  const handleRegister = async () => {
    const email = document.getElementById('register-email').value;
    // Realiza una consulta para buscar un usuario con el mismo correo electrónico
    const userQuery = query(collection(db, 'users'), where('email', '==', email));
    const userQuerySnapshot = await getDocs(userQuery);

    if (!userQuerySnapshot.empty) {
      // Si el usuario ya existe, muestra un mensaje de error
      console.log('El usuario ya existe');
      setRegisterError(true);
    } else {
      // Si el usuario no existe, crear uno en DB 'users'
      const name = document.getElementById('register-name').value;
      const password = document.getElementById('register-password').value;
      const newUser = {
        name: name,
        email: email,
        password: password
      };
      const newUserRef = await addDoc(collection(db, 'users'), newUser);
      // update userDoc with the new userRef.id, and update DB 'user' with the new user data
      newUser.id = newUserRef.id;
      await setDoc(doc(db, 'users', newUserRef.id), newUser);
      console.log('Usuario creado:', newUserRef.id);
      
      const newOrderData = {
        buyer: {
          name: newUser.name,
          email: newUser.email,
          userId: newUserRef.id
        },
        items: cart.items,
        total: cart.total,
        timestamp: serverTimestamp(),
        status: 'open',
        isloggedin: true
      };
      console.log(newOrderData.buyer);
      // setUser(newOrderData.buyer);
      postDataToDatabase(newOrderData, setCart);
    }
  }

  const handleLogin = async () => {
    const email = document.getElementById('login-email').value;
    const userQuery = query(collection(db, 'users'), where('email', '==', email));
    const userQuerySnapshot = await getDocs(userQuery);

    if (!userQuerySnapshot.empty) {
      const userDoc = userQuerySnapshot.docs[0];
      // console.log('Usuario encontrado:', userDoc.data());
      const userData = userDoc.data();
      delete userData.password;
      // setUser(userData);
      const dbOrder = await handleCartData(userData);
      const localStorageData = JSON.parse(localStorage.getItem('order'));

      // console.log('dbOrder', dbOrder);
      // console.log('localStorageData', localStorageData);
      if ( dbOrder != null && localStorageData != null && localStorageData.items != dbOrder.items ) {
        // Pregunta al usuario si desea reemplazar el carrito actual
        console.log('Hay datos en localStorage y en la base de datos');
        const confirmUpdate = window.confirm('¿Quieres reemplazar tu carrito actual con la información de la cuenta?');
        if (confirmUpdate) {
          console.log('Se reemplazará el carrito actual');
          const updatedOrderData = {
            ...dbOrder,
            buyer: {
              name: userData.name,
              email: userData.email,
              userId: userDoc.id
            },
            isloggedin: true
          };
          localStorage.setItem('order', JSON.stringify(updatedOrderData));
          // console.log('updatedOrderData', updatedOrderData);
          setCart(() => ({
            ...updatedOrderData
          }));
        } else {
          console.log('Se mantendrá el carrito actual');
          const localOrderData = {
            ...localStorageData,
            buyer: {
              name: userData.name,
              email: userData.email,
              userId: userDoc.id
            },
            isloggedin: true
          };
          localStorage.setItem('order', JSON.stringify(localOrderData));
          setCart(() => ({
            ...localOrderData
          }));
          postDataToDatabase(localOrderData, setCart);
        }
      } else if ( dbOrder != null && localStorageData == null ) {
        console.log('No hay datos en localStorage, pero si en la DB');
        // console.log(dbOrder)
        localStorage.setItem('order', JSON.stringify(dbOrder));
        setCart(() => ({
          ...dbOrder,
          buyer: {
            name: userData.name,
            email: userData.email,
            userId: userDoc.id
          },
          isloggedin: true
        }));
      } else if ( dbOrder == null && localStorageData != null ) {
        console.log('No hay datos en la db, pero si en localStorage');
        const localOrderData = {
          ...localStorageData,
          buyer: {
            name: userData.name,
            email: userData.email,
            userId: userDoc.id
          },
          isloggedin: true
        };
        localStorage.setItem('order', JSON.stringify(localOrderData));
        setCart(() => ({
          ...localOrderData
        }));
        postDataToDatabase(localOrderData);
      } else {
        console.log('No hay data...');
        const newOrderData = {
          buyer: {
            name: userData.name,
            email: userData.email,
            userId: userDoc.id
          },
          items: [],
          total: 0,
          timestamp: serverTimestamp(),
          status: 'open',
          isloggedin: true
        };
        localStorage.setItem('order', JSON.stringify(newOrderData));
        setCart(() => ({
          ...newOrderData
        }));
      }
    } else {
      setLoginError(true);
    }
    
  };

  async function handleCartData(userData) {
    // Consultar todas las órdenes con el mismo buyer.email
    // console.log('userData', userData.email);
    const matchingOrders = [];
    // const userQuery = await getDocs(query(collection(db, "orders"), where("buyer.email", "==", userData.email)));
    const userQuery = query(collection(db, "orders"), where("buyer.email", "==", userData.email));
    const userQuerySnapshot = await getDocs(userQuery);
    // console.log('userQuerySnapshot', userQuerySnapshot);
    if (!userQuerySnapshot.empty) {
      try {
        userQuerySnapshot.forEach((doc) => {
          const orderData = doc.data();
          // console.log(orderData);
          // Verifica que el estado sea "open"
          if (orderData.status === "open") {
            matchingOrders.push(orderData);
          }
        });
        if (matchingOrders.length > 0) {
          // console.log("Matching orders:", matchingOrders);
          return matchingOrders[0];
        } else {
          console.log("No hay órdenes abiertas asociadas al usuario.");
          return null; // Puedes manejar este caso según tus necesidades
        }
      } catch (error) {
        console.log(error);
      }
    }
    
  }

  function logout() {
    console.log('logout');
    localStorage.removeItem('order');
    setCart((prevCart) => ({
      items: [],
      buyer: {},
      isloggedin: false
    }));
    // setUser({});
  }

  const groupedItems = groupItemsByIdAndSize(cart.items);
  const signupClass = !signup ? 'active-toggler rounded-b-none' : 'rounded-b-none';
  const loginClass = !signup ? 'rounded-b-none' : 'active-toggler rounded-b-none';
  
  return (
      <div className='min-h-screen fluid-container grid grid-cols-1 lg:grid-cols-3'>
        <div className='order-last lg:order-first lg:col-span-2'>
          <div className='px-6'>
            <div className='flex justify-between items-end'>
              <h1 className='flex justify-between'>Tu carrito </h1>
              <button onClick={() =>clearCart(setCart)} className='text-md h-max' disabled={cart && cart.items && cart.items.length > 0 ? false : true} >Borrar todo</button>
            </div>
            <div className='py-5'>
            { cart && cart.items && cart.items.length > 0 ? (
              <div className=''>
                {Object.values(groupedItems).map((group, index) => (
                    <div key={`group-${index}`} className='cart-item-group py-2 w-full border-b border-white first-of-type:border-t'>
                      {Object.values(group).map((sizeGroup, index) => (
                        <div key={`sizegroup-${sizeGroup.size}${index}`} className='cart-item p-2 '>
                          <h2 className='text-2xl font-bold'>{sizeGroup.title}</h2>
                          <div className={`text-xl px-4 mt-1 ${sizeGroup.size}`} key={`${group.id}-${sizeGroup.size}`}>
                            <div className='flex justify-between'><h4>{sizeGroup.size}: x{sizeGroup.count}</h4> <h5> ${sizeGroup.price}</h5></div>
                            <ul className='px-4 text-base mt-2'>
                              {
                                sizeGroup.items.map((item, index) => (
                                  <div className='flex justify-between' key={`item-${item.id}${index}`}>
                                    <h3>{`${item.name != null ? item.name : '(sin nombre)' } | ${item.number != null ? item.number : '(x)' } `}</h3>
                                    <button onClick={() => removeItemFromCart(item, setCart, index)} className='text-sm h-max'>Borrar</button>
                                  </div>
                                ))
                              }
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                ))}
                <div className='flex justify-between px-6 py-2 text-xl font-bold'>
                  <h3>Total:</h3>
                  <h4>$ {total}</h4>
                </div>
                <button onClick={() => checkoutOrder(cart, setCart)} className='mt-5 flex justify-center mx-auto max-w-xs w-full bg-white bg-opacity-50 text-black text-lg'>Finalizar compra</button>
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
        </div>
        <div className='order-first lg:order-last col-span-1'>
          <div className='flex items-center flex-col'>
            { cart.buyer && cart.buyer.email ? (
              <div className='w-full px-6 flex flex-col gap-5 items-center'>
                <h2 className='text-2xl'>Bienvenido, {cart.buyer.name}!</h2>

                { cart && cart.items.length > 0 ? 
                ( <button onClick={() => checkoutOrder(cart, setCart)} className='max-w-xs w-full bg-white bg-opacity-50 text-black text-lg'>Finalizar compra</button> ) : ( <></>) }
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
                  { loginError ? ( <p className='text-red-600 text-sm'>No se encontró un usuario con ese correo electrónico, o la contraseña no coincide</p> ) : ( <></> ) }
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
                  { registerError ? ( <p className='text-red-600 text-sm'>Este email esta asociado a un usuario existente.</p> ) : ( <></> ) }
                    <div className='input-group'>
                      <label htmlFor="name">Nombre</label>
                      <input type='text' id='register-name' name='name' />
                    </div>
                    <div className='input-group'>
                      <label htmlFor="email">Email</label>
                      <input type='email' id='register-email' name='email' />
                    </div>
                    <div className='input-group'>
                      <label htmlFor="password">Contraseña</label>
                      <input type='password' id='register-password' name='password' />
                    </div>
                    <button type="button" className='mx-auto flex border-black mt-2' onClick={handleRegister}>Registrarse</button>
                  </form>
                </div>
              )
            )}
          </div>
        </div>
      </div>
  )
}

export default CartPage            