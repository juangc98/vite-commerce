import React, { useState, useEffect, useContext } from 'react'
import cartContext from '../context/cartContext.js'
import { query, where, collection, doc, setDoc, addDoc, getDoc, getDocs, getFirestore, serverTimestamp } from "firebase/firestore";
import { appFirestore } from '../services/firebaseConfig.js'
import { Link } from 'react-router-dom';

const ItemCount = ({inventory, productId, title, price}) => {
    const db = getFirestore(appFirestore);
    const ordersCollection = collection(db, 'orders');
    const { cart, setCart } = useContext(cartContext);
    const [qty, setQty] = useState(1)
    const [stock, setStock] = useState(inventory[0].Stock)

    function increment() {
        let quantity = qty;
        if (quantity < stock) {
            quantity++;
            setQty(quantity)
        }
    }
    function decrement() {
        let quantity = qty;
        if (quantity > 1) {
            quantity--;
            setQty(quantity)
        }
    }

    // Función para agregar un producto al carrito
    async function formsubmit() {
        const newProducts = Array.from({ length: qty }, () => ({
          id: productId,
          title: title,
          price: price,
          size: 'Unico',
          name: null,
          number: null
        }));
      
        setCart(async (prevCart) => {
            const currentCart = Array.isArray(prevCart) ? prevCart : [];
            const updatedCart = [...currentCart, ...newProducts];
            await handleCartUpdate(updatedCart);
            return updatedCart;
        });
      }
  
      async function handleCartUpdate(updatedCart) {
        console.log("El carrito ha sido actualizado:", updatedCart);
        await postDataToDatabase(updatedCart);
      }
  
      async function postDataToDatabase(updatedCart) {
        const orderData = {
          buyer: {
            name: 'usuario',
            email: 'usuario@example.com',
            userId: '0002',
            phone: '12312313',
          },
          isLoggedIn: false,
          items: updatedCart,
          timestamp: serverTimestamp(),
          total: '1234'
        };
        try {
            const docRef = await addDoc(ordersCollection, orderData);
            console.log("Documento creado con ID:", docRef.id);
            const cartData = {
              items: orderData.items,
              docId: docRef.id
            };
            localStorage.setItem('cart', JSON.stringify(cartData));
          } catch (error) {
            console.error("Error al crear el documento:", error);
          }
      }

    /**/
    if ( cart ) {
        if (cart.map(item => item.id).includes(productId)) {
            return (
                <div>
                    <Link to='/cart'><button className='atc-btn'>Ver carrito</button></Link>
                </div>
            )
        }
    }
    return (
        <div>
            <div className='qty-picker flex flex-nowrap gap-2 items-center mb-2'>
                <button className='minus' onClick={decrement}>-</button>
                <h4>{qty}</h4>
                <button className='plus' onClick={increment}>+</button>
            </div>
            <button className='atc-btn' onClick={formsubmit}>
                Añadir
            </button>
        </div>
    )
}

export default ItemCount