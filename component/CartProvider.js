import React, { useEffect } from "react";
import { useState, useContext, createContext } from "react";
import axios from "axios";
import { ProductCart } from "./ProductCart";
import ResetPassword from "./ResetPassword";
import { useLocalStorage } from "./hooks/useLocalStorage";

const CartContext = createContext({});

export function useProductCart() {
  return useContext(CartContext);
}

const CartProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPass, setIsOpenPass] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage("shoping-cart", []);
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const [cart, setCart] = useState([]);

  const userIsLoggedIn = !!token; //it's convert the value in true or false
  // if token(string) != null it return true
  // if token(string) = null it return false that's default js trick

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const openPassword = () => setIsOpenPass(true);
  const closePassword = () => setIsOpenPass(false);

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
    //save logintime in localstorage
    localStorage.setItem("loginTime", Date.now());
    // setShowAlert(true);
    const storedCartItem = JSON.parse(localStorage.getItem("cartItems"));
    console.log(storedCartItem);
    if (storedCartItem) {
      setCartItems(storedCartItem);
    }
  };
  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    // remove login time from localstorage
    localStorage.removeItem("loginTime");
    localStorage.removeItem("cartItems");
  };

  useEffect(() => {
    const loginTime = localStorage.getItem("loginTime");
    // console.log("Login time: ", loginTime);
    const LOGOUT_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds

    if (loginTime) {
      const timeElapsed = Date.now() - loginTime;
      // console.log(Date.now(), ">>>>>", loginTime, ">>>>>", timeElapsed);
      // check if the token is expired
      if (timeElapsed > LOGOUT_TIME) {
        logoutHandler();
      } else {
        const timeOut = setTimeout(() => {
          logoutHandler();
          setCartItems([]);
        }, LOGOUT_TIME - timeElapsed); //set the timeout for the reamining time
        return () => clearTimeout(timeOut); //clear the timeout when the component unmounts
      }
    }
  }, []);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const getItemQuantity = (id) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  const increaseCartQuantity = async (id) => {
    console.log(id);
    setCartItems((currItem) => {
      let newItem;
      if (currItem.find((item) => item.id === id) == null) {
        newItem = [...currItem, { id, quantity: 1 }];
      } else {
        newItem = currItem.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
      axios
        .post(
          `https://crudcrud.com/api/0acc82d1a34941a79715ba5418df8b76/cart`,
          { items: newItem }
        )
        .then((res) => {
          console.log(res.data);
          // console.log(res.data._id);
          setCart(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      return newItem;
    });
  };

  const decreaseCartQuantity = (id) => {
    setCartItems((currItem) => {
      let newItem;
      if (currItem.find((item) => item.id === id)?.quantity === 1) {
        newItem = currItem.filter((item) => item.id !== id);
      } else {
        newItem = currItem.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
      axios
        .post(
          `https://crudcrud.com/api/0acc82d1a34941a79715ba5418df8b76/cart`,
          { items: newItem }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      return newItem;
    });
  };

  // const removeFromCart = async (id) => {
  //   const existingCartItem = cartItems.filter((cartItem) => cartItem.id === id);
  //   console.log(existingCartItem);

  //   if (existingCartItem.length > 0) {
  //     const cartItem = existingCartItem[0];
  //     console.log(cartItem);
  //     console.log(cartItem._id);
  //     try {
  //       await axios.delete(
  //         `https://crudcrud.com/api/0acc82d1a34941a79715ba5418df8b76/cart/${cartItem._id}`
  //       );
  //       const updatedItems = cartItems.filter((cartItem) => cartItem.id !== id);
  //       setCart(updatedItems);
  //       console.log(updatedItems);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // };

  //i didn't use axios.delete to remove an item from the cart, bcz this method was causing CORS error and the axios.post to update the cart after removing the item
  // the CORS policy restricts clients from making requests to resources on a different domain, and the server hosting the cart API did not include the Access-Control-Allow-Origin header in the response, which caused the request to be blocked.
  // there are other ways to bypass the CORS policy, such as by using a proxy server or configuring the server hosting the API to include the Access-Control-Allow-Origin header in the response. However, these solutions may not be feasible or practical in certain scenarios, so using a workaround like using axios.post to update the cart after removing the item is a valid solution
  const removeFromCart = async (id) => {
    setCartItems((currItem) => {
      const updatedItems = cartItems.filter((item) => item.id !== id);
      axios
        .post(
          `https://crudcrud.com/api/0acc82d1a34941a79715ba5418df8b76/cart`,
          { item: updatedItems }
        )
        .then((res) => {
          console.log(res.data);
          setCart(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      return updatedItems;
    });
  };

  const contextValue = {
    openCart,
    closeCart,
    openPassword,
    closePassword,
    cartQuantity,
    cartItems,
    getItemQuantity,
    userIsLoggedIn,
    token,
    loginHandler,
    logoutHandler,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  };

  return (
    <CartContext.Provider value={contextValue}>
      <div>
        <ProductCart isOpen={isOpen} />
        <ResetPassword isPassword={isOpenPass} />
        {children}
      </div>
    </CartContext.Provider>
  );
};

export { CartProvider };
