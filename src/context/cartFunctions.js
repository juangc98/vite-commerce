
import { query, where, collection, doc, setDoc, addDoc, getDoc, getDocs, updateDoc, getFirestore, serverTimestamp } from "firebase/firestore";
import { appFirestore } from '../services/firebaseConfig.js'

const db = getFirestore(appFirestore);
const ordersCollection = collection(db, 'orders');

export async function postDataToDatabase(updatedCart) {
  const orderIdFromCart = updatedCart.docId;

  const orderDocRef = doc(db, "orders", orderIdFromCart);
  const orderDocSnapshot = await getDoc(orderDocRef);

  if (orderDocSnapshot.exists()) {
    // Actualizar la orden existente
    const total = updatedCart.items.reduce((acc, item) => acc + item.price, 0);
    await updateDoc(orderDocRef, {
      items: updatedCart.items,
      status: 'open',
      timestamp: serverTimestamp(),
      total: total.toString()
    });

    // Actualizar localStorage
    const updatedCartData = {
      buyer: updatedCart.buyer,
      isLoggedIn: updatedCart.isLoggedIn,
      items: updatedCart.items,
      status: 'open',
      docId: orderIdFromCart,
      total: total.toString()
    };
    updateLocalStorage(updatedCartData);
  } else {
    // Crear una nueva orden
    const orderData = {
      buyer: {
        name: null,
        email: null,
        userId: null,
        phone: null,
      },
      status: 'open',
      isLoggedIn: false,
      items: updatedCart.items,
      timestamp: serverTimestamp(),
      total: '1234'
    };

    try {
      const docRef = await addDoc(ordersCollection, orderData);
      const cartData = {
        buyer: orderData.buyer,
        items: orderData.items,
        docId: docRef.id,
        status: 'open'
      };
      updateLocalStorage(cartData);
    } catch (error) {
      console.error("Error al crear el documento:", error);
    }
  }
}

export function atcSubmit(newProduct, setCart) {
    setCart((prevCart) => {
      const currentItems = Array.isArray(prevCart.items) ? prevCart.items : [];
      const updatedItems = currentItems.concat(newProduct);
      const updatedCart = {
        ...prevCart,
        items: updatedItems,
      };
  
      // Llama a postDataToDatabase después de actualizar el cart
      postDataToDatabase(updatedCart);
  
      return updatedCart;
    });
  }

export function updateLocalStorage(cartData) {
  localStorage.setItem('order', JSON.stringify(cartData));
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
    const isLoggedIn = JSON.parse(localStorage.getItem('order')).isloggedin;
    // update context cart data
    const updatedCartData = {
        buyer,
        isLoggedIn,
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