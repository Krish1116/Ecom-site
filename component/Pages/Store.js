import productsArr from "../Data/item.json";
import marchItem from "../Data/MarchItem.json";
import { Col, Row, Button } from "react-bootstrap";
import "./Store.css";
import { ProductItem } from "../ProductItem";
import { useProductCart } from "../CartProvider";

export function Store() {
  const { openCart } = useProductCart();

  return (
    <>
      <div className="text-white title">
        <h1 className="text-center">The Generics</h1>
      </div>
      <div className="music-title-container">
        <span className="text-cente">MUSIC</span>
      </div>
      <div className="product-parent">
        <Row className="g-5 custom-item product-row">
          {productsArr.map((item, index) => (
            <Col key={index} md={6}>
              <ProductItem {...item} />
            </Col>
          ))}

          <div className="merch-title-container">
            <span className="text-cente">MERCH</span>
          </div>
          {marchItem.map((item, index) => (
            <Col key={index} md={6} className="mt-2">
              <ProductItem {...item} />
            </Col>
          ))}
        </Row>
      </div>
      <Button className="cart-button" onClick={openCart}>
        See The Cart
      </Button>
    </>
  );
}
