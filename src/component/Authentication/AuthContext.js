import React, { useContext, useEffect, useState } from "react";
import { useProductCart } from "../CartProvider";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  // cartQuentity: 0,
  // setCartQuantity: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  // const { cartItems, setCartItems } = useProductCart();
  // const [cartQuantity, setCartQuantity] = useState(0);

  // default js trick...
  const userIsLoggedIn = !!token; //it's convert the value in true or false
  // if token(string) != null it return true
  // if token(string) = null it return false that's default js trick

  const logInHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
    // const storedCartQuentity = localStorage.getItem("cartQuentity");
    // if (storedCartQuentity) {
    //   setCartQuantity(parseInt(storedCartQuentity));
    // }
  };

  const logOutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    // localStorage.setItem("cartQuentity", cartQuantity);
    // setCartQuantity(0);
    localStorage.removeItem("shoping-cart");
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
        logOutHandler();
      } else {
        const timeOut = setTimeout(() => {
          logOutHandler();
        }, LOGOUT_TIME - timeElapsed); //set the timeout for the reamining time
        return () => clearTimeout(timeOut); //clear the timeout when the component unmounts
      }
    }

    // const updatedCartQuantity = cartItems.reduce(
    //   (quantity, item) => item.quantity + quantity,
    //   0
    // );
    // setCartQuantity(updatedCartQuantity);
    // localStorage.setItem("cartQuantity", updatedCartQuantity);
  }, []);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: logInHandler,
    logout: logOutHandler,
    // cartQuantity: cartQuantity,
    // setCartQuantity: setCartQuantity,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
