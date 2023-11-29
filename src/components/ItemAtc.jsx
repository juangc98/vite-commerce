import React, { useState, useEffect, useContext } from 'react'
import cartContext from '../context/cartContext.js'
import { query, where, collection, doc, setDoc, addDoc, getDoc, getDocs, getFirestore, serverTimestamp } from "firebase/firestore";
import { appFirestore } from '../main.jsx'
 
const ItemAtc = ({size, inventory, productId, title, price}) => {
    const db = getFirestore(appFirestore);
    const ordersCollection = collection(db, 'orders');
    const [stock, setStock] = useState(0)
    const [variant, setVariant] = useState(size)
    const [number, setNumber] = useState(null)
    const [name, setName] = useState(null)
    const { cart, setCart, addToCart } = useContext(cartContext);

    // Función para agregar un producto al carrito
    async function atcSubmit() {
      console.log("añadir: 1 del producto: " + productId + " talle " + variant + " con la dorsal " + number + " y nombre " + name);
      const newProduct = { 
        id: productId,
        title: title,
        price: price,
        size: variant,
        name: name,
        number: number
      }
      setCart((prevCart) => [...prevCart, newProduct]);
      // Crea el objeto que se almacenará en Firestore
      const orderData = {
        buyer: {
          name: 'usuario',
          email: 'usuario@example.com',
          userId: '0002',
          phone: '12312313',
        },
        items: cart,
        timestamp: serverTimestamp(),
        total: '1234'
      };

      // Crea un documento en la colección "orders" y permite que Firestore genere automáticamente el ID
      addDoc(ordersCollection, orderData)
        .then((docRef) => {
          console.log("Documento creado con ID:", docRef.id);
        })
        .catch((error) => {
          console.error("Error al crear el documento:", error);
        });
    }

    function numberValidation(e) {
      const value = e.target.value;
      if (value.length === 2) {
        if (e.key !== 'Backspace' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && e.key !== 'Delete') {
          e.preventDefault();
          alert('Solo se permiten numeros del 1 a 99');
        }
      } else if (value.length < 2) {
        if ( !isNaN(e.key) ) {
          console.log(value);
        } else if ( e.key !== 'Backspace' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && e.key !== 'Delete' ) {
          e.preventDefault();
          alert('Solo se permiten numeros del 1 a 99');
        }
      }
    }

    function variantPicker(e) {
      setVariant(e.target.value);
      for (const element of inventory) {
        if (element.Size == e.target.value) {
          setStock(element.Stock)
          //console.log(stock)
          break;
        }
      }
    }
    function numberPicker(e) {
      setNumber(e.target.value)
    }
    function namePicker(e) {
      setName(e.target.value)
    }

    useEffect(() => {
      for (const element of inventory) {
        if (element.Size == variant) {
          setStock(element.Stock)
          //console.log(stock)
          break;
        }
      }

    })

    return (
        <div>
            <div className='size-picker-wrapper flex flex-row gap-2 flex-nowrap mb-4 items-center z-10'>
              { inventory.map((item, index) =>
                <div className='input-group ' key={index}>
                  <input id={`size-picker-${item.Size}-${productId}`} className='hidden' name='size-picker' type='radio' value={item.Size} defaultChecked={item.Size === variant} onChange={variantPicker} />
                  <label className='' htmlFor={`size-picker-${item.Size}-${productId}`}>
                    {item.Size}
                  </label>
                </div>
              )}
            </div>
            { stock > 0 ? (
                <>
                <div className='extra-inputs flex flex-nowrap gap-2 items-center z-10'>
                    <input type="text" id='name' placeholder='Nombre' maxLength='15' className='p-2 rounded-md' onChange={namePicker} />
                    <input type="number" id='number' placeholder='10' max='99' min='0' className='p-2 rounded-md max-w-[62px]' onKeyDown={numberValidation} onChange={numberPicker} />
                    <button className='atc-btn' onClick={atcSubmit}>
                    +
                    </button>
                </div>
                </>
            ) : (
                <>
                <div className=''>
                    <button className='atc-btn' disabled={true}>
                    Sin Stock
                    </button>
                </div>
                <div className='z-10'>
                    <a href="#">Notificarme</a>
                </div>
                </>
            )}
        </div>
    )
/*
    if ( isAvailable ) {
        return (
            <div className='extra-inputs flex flex-nowrap gap-2 items-center z-10'>
                <input type="text" placeholder='Nombre' maxLength='15' className='p-2 rounded-md' />
                <input type="number" placeholder='10' max='99' className='p-2 rounded-md max-w-[62px]' onKeyDown={numberValidation} />
                <button className='atc-btn' onClick={() => addToCart()}>
                +
                </button>
            </div>
          )
    } else {
        return (
            <>
                <div className=''>
                  <button className='atc-btn' disabled={true}>
                    Sin Stock
                  </button>
                </div>
                <div className='z-10'>
                  <a href="#">Notificarme</a>
                </div>
            </>
          )
    } */

}

export default ItemAtc