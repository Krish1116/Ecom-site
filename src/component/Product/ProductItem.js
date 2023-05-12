import { Alert, Button, Card } from "react-bootstrap";
import { formatRs } from "../utilities/FormateCurrency";
import "./ProductItem.css";
import { useState, useEffect } from "react";
import { useProductCart } from "../CartProvider";
import { Link } from "react-router-dom";

export function ProductItem({ id, album, title, price, imageUrl }) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useProductCart();

  const quantity = getItemQuantity(id);

  const [showAlert, setShowAlert] = useState(false);
  const handleAddToCart = () => {
    increaseCartQuantity(id);
    setShowAlert(true);
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <>
      <Card className="product-box">
        <Link to={`/store/${id}`} className="product-img">
          <Card.Img
            variant="top"
            src={imageUrl}
            height="250px"
            style={{ objectFit: "cover" }}
          />
        </Link>
        <Card.Body style={{ padding: "7px", marginTop: "23px" }}>
          <Card.Title>
            <h5 className="product-names">{title}</h5>
          </Card.Title>
        </Card.Body>
        <div className="album">
          <span>{album}</span>
        </div>
        <div>
          {quantity === 0 ? (
            <Button className="w-100 mt-0" onClick={handleAddToCart}>
              + Add To Cart
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: ".5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                <div>
                  <span className="fs-3">{quantity}</span> in cart
                </div>
                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
              </div>
              <Button
                onClick={() => removeFromCart(id)}
                variant="danger"
                size="sm"
              >
                Remove
              </Button>
            </div>
          )}
        </div>
        <div className="price">
          <h4 className="mb-0 me-2">Price</h4>
          <span className="ms-2 product-price">{formatRs(price)}</span>
        </div>
      </Card>
      {showAlert && (
        <Alert
          variant="primary"
          className="position-fixed bottom-0 end-0 mb-2"
          style={{ zIndex: "1" }}
        >
          Your Product: '{title}' is added to the Cart
        </Alert>
      )}
    </>
  );
}
