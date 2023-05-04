import { Offcanvas, Stack, Button } from "react-bootstrap";
import { useProductCart } from "./CartProvider";
import { CartItem } from "./CartItem";
import productItem from "./Data/item.json";
import "./ProductCart.css";

export function ProductCart({ isOpen }) {
  const { closeCart, cartItems } = useProductCart();
  const totalCurrency = cartItems.reduce((total, cartItem) => {
    const item = productItem.find((i) => i.id === cartItem.id);
    return total + (item?.price || 0) * cartItem.quantity;
  }, 0);

  return (
    <Offcanvas show={isOpen} placement="end" onHide={closeCart}>
      <div className="position-relative">
        <Offcanvas.Header className="mt-3">
          <Offcanvas.Title className="cart-name">Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cartItems.length === 0 ? (
            <div className="empty-cart"></div>
          ) : (
            <>
              <div className="cart-body">
                <Stack gap={3}>
                  {cartItems.map((ele) => (
                    <CartItem key={ele.id} {...ele} />
                  ))}
                  <div className="ms-auto fw-bold fs-5">
                    Total Currency: {totalCurrency}
                  </div>
                </Stack>
              </div>
              <div className="purchase">
                <Button className="purchase-button">Purchase</Button>
              </div>
            </>
          )}
        </Offcanvas.Body>
        <button
          type="button"
          className="btn-close position-absolute top-0 start-0 m-3"
          aria-label="Close"
          onClick={closeCart}
        ></button>
      </div>
    </Offcanvas>
  );
}
