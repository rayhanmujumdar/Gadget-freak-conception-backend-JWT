import React from "react";
import { useNavigate } from "react-router-dom";

const Product = ({product}) => {
    const {_id,name,price,text} = product
    const navigate = useNavigate()
    const handleOrder = () => {
        navigate(`/order-info/${_id}`)
    }
  return (
    <div className="col-lg-4 col-md-6">
      <div className="card bg-dark m-1 text-white">
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
          <p>Price: {price}</p>
          <p className="card-text">
            {text}
          </p>
          <button onClick={handleOrder} href="#" className="btn btn-success card-link">
            Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
