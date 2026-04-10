import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { cartService } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const syncRef = useRef(false);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Sync and Merge with backend if user is logged in
  useEffect(() => {
    const syncWithBackend = async () => {
      if (user && !syncRef.current) {
        syncRef.current = true;
        try {
          // 1. First, merge local guest items to backend
          const localGuestItems = cart.filter(item => !item.cartItemId);
          if (localGuestItems.length > 0) {
            for (const item of localGuestItems) {
              await cartService.add(item.id, item.quantity);
            }
          }

          // 2. Then fetch the final merged cart from backend
          const res = await cartService.get();
          if (res.data && res.data.items) {
            const backendItems = res.data.items.map(item => ({
              ...item.product,
              quantity: item.quantity,
              cartItemId: item.id
            }));
            setCart(backendItems);
          }
        } catch (err) {
          console.error('Error syncing cart:', err);
        }
      } else if (!user) {
        syncRef.current = false;
      }
    };

    syncWithBackend();
  }, [user]);

  const addToCart = async (product, quantity = 1) => {
    let cartItemId = null;
    if (user) {
      try {
        const res = await cartService.add(product.id, quantity);
        // Find the new item id if possible or just re-sync
        const freshCart = await cartService.get();
        const addedItem = freshCart.data.items.find(i => i.product_id === product.id);
        cartItemId = addedItem?.id;
      } catch (err) {
        console.error('Error adding to backend cart:', err);
      }
    }

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity, cartItemId: cartItemId || item.cartItemId } : item
        );
      }
      return [...prevCart, { ...product, quantity, cartItemId }];
    });
  };

  const removeFromCart = async (productId) => {
    const item = cart.find(i => i.id === productId);
    if (user && item?.cartItemId) {
      try {
        await cartService.remove(item.cartItemId);
      } catch (err) {
        console.error('Error removing from backend cart:', err);
      }
    }
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    
    const item = cart.find(i => i.id === productId);
    if (user && item?.cartItemId) {
      try {
        await cartService.update(item.cartItemId, quantity);
      } catch (err) {
        console.error('Error updating backend cart:', err);
      }
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0);
  const cartCount = cart.reduce((count, item) => count + (item.quantity || 0), 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
