
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
      // const orderData = orderDocSnapshot.data();
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
      //console.log('updatedOrder', updatedCart)
      console.log('Update order');
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
    console.log('New order');
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
        // console.log("orderData", orderData)
        // console.log("cartData",cartData)
        const orderDocRef = doc(db, "orders", docRef.id);
        updateDoc(orderDocRef, {
          docId: docRef.id,
          timestamp: serverTimestamp()
        });
        // console.log("Order docId updated");
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
  localStorage.setItem('order', JSON.stringify(cartData));
  if (setCart) {
    setCart((prevCart) => {
      const updatedCart = {
        ...cartData
      };
      console.log('updatedCart', updatedCart);
      return updatedCart;
    });
  }
}

export async function checkoutOrder(cart, setCart) {
  console.log('checkoutOrder', cart.docId);
  const items = cart.items;
  const groupedItems = groupItemsByIdAndSize(items);
  const itemsIds = Object.keys(groupedItems);
  const outOfStockItems = [];
  try {
    const itemsQuery = query(collection(db, 'productos'));
    const itemsQuerySnapshot = await getDocs(itemsQuery);
    // Verificar el stock para cada producto
    const filteredItemsQuerySnapshot = itemsQuerySnapshot.docs.filter(doc => itemsIds.includes(doc.id));
    console.log('filteredItemsQuerySnapshot', filteredItemsQuerySnapshot);
    filteredItemsQuerySnapshot.forEach(doc => {
      const itemId = doc.id;
      const itemData = doc.data();
      const inventory = itemData.Inventory || [];
      Object.keys(groupedItems[itemId]).forEach(size => {
        const itemQuantity = groupedItems[itemId][size].count;
        // Buscar el objeto correspondiente al tamaño en el inventario
        const inventoryItem = inventory.find(item => item.Size === size);
        /**/
        if (inventoryItem && inventoryItem.Stock < itemQuantity) {
          console.log(`No hay suficiente stock para el producto con ID ${itemId}, Tamaño ${size}`);
          outOfStockItems.push({
              id: itemId,
              name: itemData.title,
              size,
              quantity: itemQuantity,
              availableStock: inventoryItem.Stock
          });
        }
      })
    })
    //console.log('outOfStockItems', outOfStockItems);
    // Mostrar mensaje al usuario si hay productos sin suficiente stock
    if (outOfStockItems.length > 0) {
        const message = outOfStockItems.map(item => `Producto: ${item.name} (${item.size}) -> Stock disponible: ${item.availableStock}`).join('\n');
        alert(`No hay suficiente stock para los siguientes productos:\n${message}`);
        return; // Detener el proceso si hay productos sin suficiente stock
    } else {
        // Actualizar el stock de los productos
        filteredItemsQuerySnapshot.forEach(async doc => {
            const itemId = doc.id;
            const itemData = doc.data();
            const inventory = itemData.Inventory || [];
            const inventoryUpdates = [...inventory];
            Object.keys(groupedItems[itemId]).forEach(size => {
                const itemQuantity = groupedItems[itemId][size].count;
                const inventoryItemIndex = inventory.findIndex(item => item.Size === size);
                if (inventoryItemIndex !== -1) {
                    // Actualizar el stock correspondiente al tamaño en el inventario
                    inventoryUpdates[inventoryItemIndex] = {
                        ...inventory[inventoryItemIndex],
                        Stock: inventory[inventoryItemIndex].Stock - itemQuantity
                    };
                }
            });

            console.log('inventoryUpdates', inventoryUpdates);
            updateDBproduct(itemId, inventoryUpdates);
        });
        // Actualizar el estado de la orden
        const docId = JSON.parse(localStorage.getItem('order')).docId;
        const orderDocRef = doc(db, "orders", docId);
        updateDoc(orderDocRef, {
            status: 'processing',
            timestamp: serverTimestamp()
        });
        console.log("Order status updated to processing")
        const buyer = cart.buyer;
        const isloggedin = cart.isloggedin;
        const updatedCartData = {
            buyer,
            isloggedin,
            items: [],
            status: 'blank',
            docId: null
        };
        updateLocalStorage(updatedCartData, setCart);
        setCart(() => {
            return updatedCartData;
        });
    }
  } catch (error) {
      console.error('Error al consultar la base de datos:', error);
  }
}

function updateDBproduct(itemId, inventoryUpdates) {
  const itemDocRef = doc(db, "productos", itemId);
  updateDoc(itemDocRef, { Inventory: inventoryUpdates });
  console.log(`Stock actualizado para el producto con ID ${itemId}`);
}

export function groupItemsByIdAndSize(items) {
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

export function removeItemFromCart(item, setCart, index) {
  setCart((prevCart) => {
    const Items = Array.isArray(prevCart.items) ? prevCart.items : [];
    const currentItems = Items.filter(cartItem => !(cartItem.id === item.id && cartItem.size === item.size));
    console.log('currentItems', currentItems);
    const updatedItems = currentItems.filter((cartItem, i) => i !== index);
    console.log('updatedItems', updatedItems);
    const total = updatedItems.reduce((acc, item) => acc + item.price, 0);
    const updatedCart = {
      ...prevCart,
      items: updatedItems,
      total: total.toString()
    };
    //postDataToDatabase(updatedCart, setCart)
    return updatedCart;
  });
}

export function clearCart(setCart) {
  setCart((prevCart) => {
    const updatedCart = {
      ...prevCart,
      items: [],
      total: ''
    };
    updateLocalStorage(updatedCart)
    return updatedCart;
  });
  // delete order from database
  const docId = JSON.parse(localStorage.getItem('order')).docId;
  const orderDocRef = doc(db, "orders", docId);
  updateDoc(orderDocRef, {
    status: 'closed',
    timestamp: serverTimestamp()
  });
  console.log("Order status updated to closed")
}