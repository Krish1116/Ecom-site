import React, { useState, createContext, useContext, useEffect } from "react";
import { ProductCart } from "./ProductCart";
import ResetPassword from "./ResetPassword";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Alert, Button } from "react-bootstrap";
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
  const [showAlert, setShowAlert] = useState(false);

  const userIsLoggedIn = !!token; //it's convert the value in true or false
  // if token(string) != null it return true
  // if token(string) = null it return false that's default js trick

  // const startTime = new Date().toLocaleString();
  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
    //save logintime in localstorage
    localStorage.setItem("loginTime", Date.now());
    setShowAlert(true);
  };
  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    // remove login time from localstorage
    localStorage.removeItem("loginTime");
  };

  useEffect(() => {
    const loginTime = localStorage.getItem("loginTime");
    console.log("Login time: ", loginTime);
    const LOGOUT_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds

    if (loginTime) {
      const timeElapsed = Date.now() - loginTime;
      console.log(Date.now(), ">>>>>", loginTime, ">>>>>", timeElapsed);
      // check if the token is expired
      if (timeElapsed > LOGOUT_TIME) {
        logoutHandler();
      } else {
        const timeOut = setTimeout(() => {
          logoutHandler();
        }, LOGOUT_TIME - timeElapsed); //set the timeout for the reamining time
        return () => clearTimeout(timeOut); //clear the timeout when the component unmounts
      }
    }
    // if (showAlert) {
    //   const timer = setTimeout(() => {
    //     setShowAlert(false);
    //   }, 3000);

    //   return () => clearTimeout(timer);
    // }
    // }, [showAlert]);
  }, []);

  // const SessionExpire = () => {
  //   return (
  //     <div>
  //       <p>Your session has Expired. Please login again.</p>
  //     </div>
  //   );
  // };

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
      <>
        <div>
          <ProductCart isOpen={isOpen} />
          <ResetPassword isPassword={isOpenPass} />
          {children}
        </div>
        {/* <div>
            {token ? (
              <div>
                <Alert className="position-fixed " style={{ zIndex: "1" }}>
                  You are logged in!
                </Alert>
              </div>
            ) : (
              <Alert>
                <h1>Please login</h1>
                <Button onClick={() => loginHandler("dummy_token")}>Login</Button>
              </Alert>
            )}
            {!token && <SessionExpire />}
          </div> */}
      </>
    </CartContext.Provider>
  );
}

export { CartProvider };
