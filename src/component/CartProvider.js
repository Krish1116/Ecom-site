import React, { useState, createContext, useContext, useEffect } from "react";
import { ProductCart } from "./ProductCart";
import ResetPassword from "./ResetPassword";
import { useLocalStorage } from "./hooks/useLocalStorage";
const CartContext = createContext({});

export function useProductCart() {
  return useContext(CartContext);
}

function CartProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPass, setIsOpenPass] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage("shoping-cart", []);
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token; //it's convert the value in true or false
  // if token(string) != null it return true
  // if token(string) = null it return false that's default js trick

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };
  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const openPassword = () => setIsOpenPass(true);
  const closePassword = () => setIsOpenPass(false);

  function getItemQuantity(id) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseCartQuantity(id) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(id) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }

  console.log(token);

  return (
    <CartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
        openCart,
        closeCart,
        token,
        userIsLoggedIn,
        loginHandler,
        logoutHandler,
        openPassword,
        closePassword,
      }}
    >
      <div>
        <ProductCart isOpen={isOpen} />
        <ResetPassword isPassword={isOpenPass} />
        {children}
      </div>
    </CartContext.Provider>
  );
}

export { CartProvider };
