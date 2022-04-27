import axios from "axios";
import React, { useEffect, useState } from "react";
import Product from "../Product/Product";

const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/product").then((response) => {
      setProducts(response.data);
    });
  }, []);
  return (
    <div className="min-vh-100 container">
      <h1 className="text-center text-success">
        This is my product collection
      </h1>
      <div className="row">
        {products.map((product) => (
          <Product product={product}></Product>
        ))}
      </div>
    </div>
  );
};

export default Products;
