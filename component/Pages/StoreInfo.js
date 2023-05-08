import React from "react";
import { useParams } from "react-router-dom";
import productsArr from "../Data/item.json";
import marchItem from "../Data/MarchItem.json";
import SinglePageData from "../SinglePageData";

const StoreInfo = () => {
  const { store_id } = useParams();
  const product =
    productsArr.find((item) => item.id == store_id) ||
    marchItem.find((item) => item.id == store_id) ||
    {};

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <div className="text-white title">
        <h1 className="text-center">The Generics</h1>
      </div>

      <div className="product-parent">
        <SinglePageData {...product} key={product.id} />
      </div>
    </>
  );
};

export { StoreInfo };
