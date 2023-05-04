import { Container, Button, Nav, Navbar as NavbarBs } from "react-bootstrap";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useProductCart } from "./CartProvider";
import { Link } from "react-router-dom";

export function Navbar() {
  const { openCart, cartQuantity, userIsLoggedIn, logoutHandler } =
    useProductCart();

  return (
    <>
      {/* // NavbarBs bcz the function name is also same than I can change it's name */}
      <NavbarBs sticky="top" className="bg-custom shadow p-3 mb-5">
        {/* <div className="userName">
          {user ? <p>Welcome, {user.displayName}!</p> : <p>Please Sign Up</p>}
        </div> */}
        <Container>
          <Nav className="mx-auto mr-3">
            {userIsLoggedIn && (
              <Nav.Link to="/" as={NavLink} className="me-4 font-weight-bold">
                Home
              </Nav.Link>
            )}
            {userIsLoggedIn && (
              <Nav.Link
                to="/store"
                as={NavLink}
                className="me-4 font-weight-bold"
              >
                Store
              </Nav.Link>
            )}
            {userIsLoggedIn && (
              <Nav.Link
                to="/about"
                as={NavLink}
                className="me-4 font-weight-bold"
              >
                About
              </Nav.Link>
            )}
            {userIsLoggedIn && (
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
          {userIsLoggedIn ? (
            <Link to="/signup">
              <Button onClick={logoutHandler}> Log out</Button>
            </Link>
          ) : (
            <Link to="/signup">
              <Button className="ml-4 ">Sign Up</Button>
            </Link>
          )}
        </Container>
      </NavbarBs>
    </>
  );
}
