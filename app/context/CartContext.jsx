'use client';
import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.name === item.name);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const increaseQuantity = (itemName) => {
    setCart((prevCart) =>
      prevCart.map((i) =>
        i.name === itemName ? { ...i, quantity: i.quantity + 1 } : i
      )
    );
  };

  const decreaseQuantity = (itemName) => {
    setCart((prevCart) =>
      prevCart
        .map((i) =>
          i.name === itemName ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const removeFromCart = (name) => {
    setCart((prevCart) => prevCart.filter((item) => item.name !== name));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = parsePrice(item.price);
      return total + (price * item.quantity);
    }, 0);
  };

  const parsePrice = (price) => {
    if (!price) return 0;
    const clean = parseInt(price.toString().replace(/[₦,]/g, ''), 10);
    return isNaN(clean) ? 0 : clean;
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      increaseQuantity, 
      decreaseQuantity, 
      removeFromCart, 
      clearCart,
      getCartTotal,
      parsePrice
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}