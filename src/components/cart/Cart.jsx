import React from "react";
import "./Cart.css";
const Cart = ({ num, click }) => {
  return (
    <button className="ui-change-btn" onClick={() => click(true)}>
      You Added <span>{num}</span> {num <= 1 ? "item" : "items"}
    </button>
  );
};

export default Cart;
