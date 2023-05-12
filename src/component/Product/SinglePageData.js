import React, { useEffect, useState } from "react";
import "./SinglePageData.css";
import { formatRs } from "../utilities/FormateCurrency";
import { useProductCart } from "../CartProvider";
import { Button } from "react-bootstrap";

const SinglePageData = (product) => {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
    openCart,
  } = useProductCart();
  const quantity = getItemQuantity(product.id);

  const [showAlert, setShowAlert] = useState(false);
  const handleAddToCart = () => {
    increaseCartQuantity(product.id);
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
      <div className="product">
        <div className="details">
          <div className="big-img">
            <img src={product.imageUrl} alt="" />
          </div>
          <div className="box">
            <div className="row">
              <h2>{product.title}</h2>
              <span>{formatRs(product.price)}</span>
            </div>
            <div className="color">
              {product.colors.map((color, index) => (
                <button style={{ background: color }} key={index}></button>
              ))}
            </div>
            <p>{product.des}</p>

            {/* <button className="cart">Add to Cart</button> */}
            <div className="mt-0">
              {quantity === 0 ? (
                <Button className="w-100" onClick={handleAddToCart}>
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
                    <Button onClick={() => decreaseCartQuantity(product.id)}>
                      -
                    </Button>
                    <div>
                      <span className="fs-3">{quantity}</span> in cart
                    </div>
                    <Button onClick={() => increaseCartQuantity(product.id)}>
                      +
                    </Button>
                  </div>
                  <Button
                    onClick={() => removeFromCart(product.id)}
                    variant="danger"
                    size="sm"
                  >
                    Remove
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Button className="cart-button1" onClick={openCart}>
        See The Cart
      </Button>
    </>
  );
};

export default SinglePageData;
