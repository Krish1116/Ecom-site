import React, { useEffect } from "react";
import axios from "axios";
import { useState, useContext, createContext } from "react";
import { ProductCart } from "../component/Product/ProductCart";
import { useLocalStorage } from "./hooks/useLocalStorage";

const CartContext = createContext({});

export function useProductCart() {
  return useContext(CartContext);
}

const CartProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage("shoping-cart", []);
  const [emailId, setEmailId] = useState(localStorage.getItem("emailId") || "");
  const [baseURL, setBaseURL] = useState(null);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  useEffect(() => {
    const replacedEmailId = emailId
      .replace("@", "")
      .replace(".", "")
      .replace(".", "");
    const newBaseURL = `https://crudcrud.com/api/a25c82cb206a40e38142766db70e43d7/${replacedEmailId}`;
    setBaseURL(newBaseURL); // Update baseURL state with the new URL
    setLoading(true);
    if (!emailId) {
      setLoading(false);
      return;
    }
    const getUserData = async () => {
      try {
        const res = await axios.get(newBaseURL); // Use newBaseURL instead of baseURL
        // console.log(res.data);
        setItems(res.data);
        setLoading(false);
        if (cartItems.length > 0) {
          setItems((prevItem) =>
            prevItem.map((item) => ({
              ...item,
              quantity:
                cartItems.find((cartItm) => cartItm.id === item.id)?.quantity ||
                item.quantity,
            }))
          );
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    getUserData();
  }, [cartItems, emailId]);

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
        .post(`${baseURL}`, { items: newItem })
        .then((res) => {
          console.log(res.data);
          // console.log(res.data._id);
          // setCart(res.data);
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
        .post(`${baseURL}`, { items: newItem })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      return newItem;
    });
  };

  //i didn't use axios.delete to remove an item from the cart, bcz this method was causing CORS error and the axios.post to update the cart after removing the item
  // the CORS policy restricts clients from making requests to resources on a different domain, and the server hosting the cart API did not include the Access-Control-Allow-Origin header in the response, which caused the request to be blocked.
  // there are other ways to bypass the CORS policy, such as by using a proxy server or configuring the server hosting the API to include the Access-Control-Allow-Origin header in the response. However, these solutions may not be feasible or practical in certain scenarios, so using a workaround like using axios.post to update the cart after removing the item is a valid solution

  const removeFromCart = (id) => {
    // remove post
    setCartItems((currItems) => {
      const updatedItems = currItems.filter((item) => item.id !== id);
      axios
        .post(`${baseURL}`, { items: updatedItems })
        .then((res) => {
          console.log(res);
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
    // openPassword,
    // closePassword,
    cartQuantity,
    cartItems,
    items,
    setCartItems,
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  };

  return (
    <CartContext.Provider value={contextValue}>
      <div>
        <ProductCart isOpen={isOpen} />
        {children}
      </div>
    </CartContext.Provider>
  );
};

export { CartProvider };
