
import { query, where, collection, doc, setDoc, addDoc, getDoc, getDocs, updateDoc, getFirestore, serverTimestamp } from "firebase/firestore";
import { appFirestore } from '../services/firebaseConfig.js'

const db = getFirestore(appFirestore);
const ordersCollection = collection(db, 'orders');

export async function postDataToDatabase(updatedCart, setCart) {
  const orderIdFromCart = updatedCart.docId;
  if (orderIdFromCart) {
    const orderDocRef = doc(db, "orders", orderIdFromCart);
    const orderDocSnapshot = await getDoc(orderDocRef);
    
    if (orderDocSnapshot.exists()) {
      // Actualizar la orden existente
      const orderData = orderDocSnapshot.data();
      // console.log('orderDocRef', orderData);
      // console.log('Actualizando la orden existente');
      const total = updatedCart.items.reduce((acc, item) => acc + item.price, 0);
      const updatedOrder = await updateDoc(orderDocRef, {
        items: updatedCart.items,
        status: 'open',
        timestamp: serverTimestamp(),
        total: total.toString()
      });
      // Actualizar localStorage
      console.log('updatedOrder', updatedCart)

      const updatedCartData = {
        buyer: updatedCart.buyer,
        isloggedin: updatedCart.isloggedin,
        items: updatedCart.items,
        status: 'open',
        docId: orderIdFromCart,
        total: total.toString(),
        timestamp: serverTimestamp(),
      };
      updateLocalStorage(updatedCartData, setCart);
    }
  } else {
    // Crear una nueva orden
    console.log('Creando una nueva orden');
    const total = updatedCart.items.reduce((acc, item) => acc + item.price, 0);
    const orderData = {
      buyer: updatedCart.buyer,
      status: 'open',
      isloggedin: true,
      items: updatedCart.items,
      timestamp: serverTimestamp(),
      total: total.toString()
    };

    try {
      const docRef = await addDoc(ordersCollection, orderData);
      const cartData = {
        buyer: orderData.buyer,
        items: orderData.items,
        docId: docRef.id,
        status: 'open',
        isloggedin: true,
        total: total.toString(),
        timestamp: serverTimestamp()
      };
      try {
        console.log("orderData", orderData)
        console.log("cartData",cartData)
        const orderDocRef = doc(db, "orders", docRef.id);
        updateDoc(orderDocRef, {
          docId: docRef.id,
          timestamp: serverTimestamp()
        });
        console.log("Order docId updated");
        console.log( docRef.id)
        updateLocalStorage(cartData, setCart);
      } catch (error) {
        console.error("Error al actualizar el documento:", error);
      }
      
    } catch (error) {
      console.error("Error al crear el documento:", error);
    }
    
    
  }
}

export function atcSubmit(newProduct, setCart) {
    setCart((prevCart) => {
      const currentItems = Array.isArray(prevCart.items) ? prevCart.items : [];
      const updatedItems = currentItems.concat(newProduct);
      //console.log(prevCart);
      const total = updatedItems.reduce((acc, item) => acc + item.price, 0);
      const updatedCart = {
        ...prevCart,
        items: updatedItems,
        total: total.toString()
      };
      if (prevCart.buyer.length > 0 || prevCart.isloggedin != true) {
        updateLocalStorage(updatedCart, setCart)
      } else {
        postDataToDatabase(updatedCart, setCart);
      }
      return updatedCart;
    });
  }

export function updateLocalStorage(cartData, setCart) {
  console.log(cartData);
  localStorage.setItem('order', JSON.stringify(cartData));
  setCart((prevCart) => {
    const updatedCart = {
      ...cartData
    };
    console.log('updatedCart', updatedCart);
    return updatedCart;
  });
}

export function checkoutOrder(setCart) {
    console.log('checkoutOrder');
    // const docId = JSON.parse(localStorage.getItem('order')).docId;
    // const orderDocRef = doc(db, "orders", docId);
    // updateDoc(orderDocRef, {
    //     status: 'processing',
    //     timestamp: serverTimestamp()
    // });
    console.log("Order status updated to processing")
    const buyer = JSON.parse(localStorage.getItem('order')).buyer;
    const isloggedin = JSON.parse(localStorage.getItem('order')).isloggedin;
    // update context cart data
    const updatedCartData = {
        buyer,
        isloggedin,
        items: [],
        status: 'blank',
        docId: null
    };
    updateLocalStorage(updatedCartData);
    console.log("localStorage order data deleted");
    // update context
    setCart(() => {
        return updatedCartData;
    });

}