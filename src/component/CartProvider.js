import React, { useEffect } from "react";
import { useState, useContext, createContext } from "react";
import axios from "axios";
import { ProductCart } from "../component/Product/ProductCart";
// import ResetPassword from "./Authentication/ResetPassword";
import { useLocalStorage } from "./hooks/useLocalStorage";

const CartContext = createContext({});

export function useProductCart() {
  return useContext(CartContext);
}

// let useremail = "";
// if (localStorage.getItem("emailId") === null) {
//   useremail = "";
// } else {
//   useremail = localStorage.getItem("emailId");
// }
// console.log(useremail);
// const replacedEmailId = useremail
//   .replace("@", "")
//   .replace(".", "")
//   .replace(".", "");
// console.log(replacedEmailId);

// export const baseURL = `https://crudcrud.com/api/2c0a6ef5175e4fadb84d60b0bee2ca42/${replacedEmailId}`;
// console.log(baseURL);
const CartProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  // const [isOpenPass, setIsOpenPass] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage("shoping-cart", []);
  const [emailId, setEmailId] = useState(localStorage.getItem("emailId") || "");
  const replacedEmailId = emailId
    .replace("@", "")
    .replace(".", "")
    .replace(".", "");
  const [baseURL, setBaseURL] = useState(
    `https://crudcrud.com/api/d6d1f4ce99f047c094cab363c616f3f7/${replacedEmailId}`
  );

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  useEffect(() => {
    setLoading(true);
    const getUserData = async () => {
      if (!emailId) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${baseURL}`);
        // console.log(res.data);
        setItems(res.data);
        setLoading(false);
        // if (cartItems.length > 0) {
        //   setItems((prevItem) =>
        //     prevItem.map((item) => ({
        //       ...item,
        //       quantity:
        //         cartItems.find((cartItm) => cartItm.id === item.id)?.quantity ||
        //         item.quantity,
        //     }))
        //   );
        // }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }

      // put reqeust
    };
    getUserData();
  }, [cartItems]);

  // const openPassword = () => setIsOpenPass(true);
  // const closePassword = () => setIsOpenPass(false);

  // useEffect(() => {
  //   const getUserData = async () => {
  //     if (!useremail) {
  //       setLoading(false);
  //       return;
  //     }

  //     try {
  //       const res = await axios.get(`${baseURL}`);
  //       // console.log(res.data);
  //       setItems(res.data);
  //       setLoading(false);
  //     } catch (err) {
  //       console.log(err);
  //       setLoading(false);
  //     }
  //   };
  //   getUserData();
  // }, []);
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // useEffect(() => {
  //   const loginTime = localStorage.getItem("loginTime");
  //   // console.log("Login time: ", loginTime);
  //   const LOGOUT_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds

  //   if (loginTime) {
  //     const timeElapsed = Date.now() - loginTime;
  //     // console.log(Date.now(), ">>>>>", loginTime, ">>>>>", timeElapsed);
  //     // check if the token is expired
  //     if (timeElapsed > LOGOUT_TIME) {
  //       logoutHandler();
  //     } else {
  //       const timeOut = setTimeout(() => {
  //         logoutHandler();
  //         setCartItems([]);
  //       }, LOGOUT_TIME - timeElapsed); //set the timeout for the reamining time
  //       return () => clearTimeout(timeOut); //clear the timeout when the component unmounts
  //     }
  //   }
  // }, []);

  // localStorage.setItem("cartQuntity", cartQuantity);
  // const storedCartQuantity = localStorage.getItem("cartQuntity");
  // console.log(storedCartQuantity);
  // const cartQuantity = storedCartQuantity ? parseInt(storedCartQuantity) : 0;
  // console.log(cartQuantity);
  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
    // put reqeust
  );

  const getItemQuantity = (id) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  const increaseCartQuantity = async (id) => {
    // remove post
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
    // remove post
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

  // const removeFromCart = async (id) => {
  //   const existingCartItem = cartItems.filter((cartItem) => cartItem.id === id);
  //   console.log(existingCartItem);

  //   if (existingCartItem.length > 0) {
  //     const cartItem = existingCartItem[0];
  //     console.log(cartItem);
  //     console.log(cartItem.id);

  //     const confirmRemove = window.confirm(
  //       "Are you sure you want to remove this item from your cart?"
  //     );
  //     if (!confirmRemove) {
  //       return; // do not remove item if user cancels
  //     }

  //     try {
  //       await axios.delete(`${baseURL}/${cartItem.id}`);
  //       setCartItems((currItems) => currItems.filter((item) => item.id !== id));
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // };

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
        {/* <ResetPassword isPassword={isOpenPass} /> */}
        {children}
      </div>
    </CartContext.Provider>
  );
};

export { CartProvider };
