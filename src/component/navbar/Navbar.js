import { Container, Button, Nav, Navbar as NavbarBs } from "react-bootstrap";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useProductCart } from "../CartProvider";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../Authentication/AuthContext";
// import { auth } from "../FireBase/FireBase";

export function Navbar() {
  const { openCart, cartQuantity } = useProductCart();
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const logOutHandler = () => {
    authCtx.logout({ item: [] });
    // authCtx.items = [];
    localStorage.removeItem("token");
    localStorage.removeItem("emailID");
  };

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     setUser(user);
  //   });
  //   return () => unsubscribe();
  // }, []);

  // const initialUser = JSON.parse(localStorage.getItem("user"));
  // const [user, setUser] = useState(initialUser);
  // const userName =
  //   initialUser && initialUser.displayName ? initialUser.displayName : "User";

  return (
    <>
      {/* // NavbarBs bcz the function name is also same than I can change it's name */}
      <NavbarBs sticky="top" className="bg-custom shadow p-3 mb-5">
        <div className="userName">
          {isLoggedIn ? <p>Welcome, User!</p> : <p>Please Sign Up</p>}
        </div>{" "}
        <Container>
          <Nav className="mx-auto mr-3">
            {isLoggedIn && (
              <Nav.Link
                to="/home"
                as={NavLink}
                className="me-4 font-weight-bold"
              >
                Home
              </Nav.Link>
            )}
            {isLoggedIn && (
              <Nav.Link
                to="/store"
                as={NavLink}
                className="me-4 font-weight-bold"
              >
                Store
              </Nav.Link>
            )}
            {isLoggedIn && (
              <Nav.Link
                to="/about"
                as={NavLink}
                className="me-4 font-weight-bold"
              >
                About
              </Nav.Link>
            )}
            {isLoggedIn && (
              <Nav.Link
                to="/contactus"
                as={NavLink}
                className="me-4 font-weight-bold"
              >
                Contact Us
              </Nav.Link>
            )}
          </Nav>
          <Button className="cart" onClick={openCart}>
            <span className="me-2">Cart</span>
            <AiOutlineShoppingCart size={20} />
            <div className="rounded-circle bg-danger d-flex justify-content-center counter">
              {cartQuantity}
            </div>
          </Button>
          {isLoggedIn ? (
            <Link to="/">
              <Button onClick={logOutHandler}> Log out</Button>
            </Link>
          ) : (
            <Link to="/">
              <Button className="ml-4 ">Sign Up</Button>
            </Link>
          )}
        </Container>
      </NavbarBs>
    </>
  );
}
